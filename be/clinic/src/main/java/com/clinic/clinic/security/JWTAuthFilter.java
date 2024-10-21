package com.clinic.clinic.security;

import com.clinic.clinic.config.Admin.AdminDetailsService;
import com.clinic.clinic.config.Doctor.DoctorDetailsService;
import com.clinic.clinic.config.Reception.ReceptionistDetailsService;
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

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AdminDetailsService adminDetailsService;

    @Autowired
    private DoctorDetailsService doctorDetailsService;

    @Autowired
    private ReceptionistDetailsService receptionistDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.warn("No Bearer token found in request");
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = null;

            try {
                userDetails = adminDetailsService.loadUserByUsername(userEmail);
                logger.info("User found in admin service: {}", userDetails.getUsername());
            } catch (UsernameNotFoundException e) {
                logger.warn("User not found in admin service, trying doctor service");
                try {
                    userDetails = doctorDetailsService.loadUserByUsername(userEmail);
                    logger.info("User found in doctor service: {}", userDetails.getUsername());
                } catch (UsernameNotFoundException e2) {
                    logger.warn("User not found in doctor service, trying receptionist service");
                    try {
                        userDetails = receptionistDetailsService.loadUserByUsername(userEmail);
                        logger.info("User found in receptionist service: {}", userDetails.getUsername());
                    } catch (UsernameNotFoundException e3) {
                        logger.error("User not found in any service (admin, doctor, receptionist)");
                        return; // Ngừng xử lý nếu không tìm thấy người dùng
                    }
                }
            }

            if (userDetails != null && jwtUtils.isValidToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.info("Authentication set for user: {}", userDetails.getUsername());
            } else {
                logger.warn("Token is not valid or user details are null");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is not valid");
                return; // Ngừng xử lý nếu token không hợp lệ
            }
        }

        filterChain.doFilter(request, response);
    }
}
