package com.clinic.clinic.security;

import com.clinic.clinic.config.Admin.AdminDetailsService;
import com.clinic.clinic.config.Doctor.DoctorDetailsService;
import com.clinic.clinic.config.Receptionist.ReceptionistDetailsService;
import com.clinic.clinic.utils.JWTUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JWTAuthFilter.class);

    private final JWTUtils jwtUtils;
    private final AdminDetailsService adminDetailsService;
    private final DoctorDetailsService doctorDetailsService;
    private final ReceptionistDetailsService receptionistDetailsService;

    @Autowired
    public JWTAuthFilter(JWTUtils jwtUtils, AdminDetailsService adminDetailsService,
                         DoctorDetailsService doctorDetailsService,
                         ReceptionistDetailsService receptionistDetailsService) {
        this.jwtUtils = jwtUtils;
        this.adminDetailsService = adminDetailsService;
        this.doctorDetailsService = doctorDetailsService;
        this.receptionistDetailsService = receptionistDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            final String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }

            final String jwtToken = authHeader.substring(7);
            final String userEmail = jwtUtils.extractUsername(jwtToken);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = loadUserDetails(userEmail);

                if (userDetails != null) {
                    if (jwtUtils.isTokenExpired(jwtToken)) {
                        logger.warn("JWT expired for user: {}", userEmail);
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT expired");
                        return;
                    }

                    // Nếu token sắp hết hạn, tạo token mới
                    if (jwtUtils.needsRefresh(jwtToken)) {
                        String newToken = jwtUtils.generateToken(userDetails);
                        response.setHeader("New-Token", newToken);
                        logger.info("Token refreshed for user: {}", userEmail);
                    }

                    if (jwtUtils.isValidToken(jwtToken, userDetails)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            logger.error("JWT processing error: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT processing error: " + e.getMessage());
        }
    }

    private UserDetails loadUserDetails(String userEmail) {
        try {
            return adminDetailsService.loadUserByUsername(userEmail);
        } catch (UsernameNotFoundException exAdmin) {
            try {
                return doctorDetailsService.loadUserByUsername(userEmail);
            } catch (UsernameNotFoundException exDoctor) {
                try {
                    return receptionistDetailsService.loadUserByUsername(userEmail);
                } catch (UsernameNotFoundException exReceptionist) {
                    logger.warn("User not found in any service for email: {}", userEmail);
                    return null;
                }
            }
        }
    }
}
