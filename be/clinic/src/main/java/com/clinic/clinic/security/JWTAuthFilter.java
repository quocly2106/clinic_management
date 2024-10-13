package com.clinic.clinic.security;

import com.clinic.clinic.config.Admin.AdminDetailsService;
import com.clinic.clinic.config.Doctor.DoctorDetailsService;
import com.clinic.clinic.utils.JWTUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AdminDetailsService adminDetailsService;

    @Autowired
    private DoctorDetailsService doctorDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No Bearer token found");
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        System.out.println("Extracted email: " + userEmail);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = null;

            try {
                userDetails = adminDetailsService.loadUserByUsername(userEmail);
                System.out.println("User found in admin service: " + userDetails.getUsername());
            } catch (UsernameNotFoundException adminNotFoundException) {
                System.out.println("User not found in admin service, trying doctor service");
                try {
                    userDetails = doctorDetailsService.loadUserByUsername(userEmail);
                    System.out.println("User found in doctor service: " + userDetails.getUsername());
                } catch (UsernameNotFoundException doctorNotFoundException) {
                    System.out.println("User not found in both admin and doctor services");
                }
            }

            if (userDetails != null && jwtUtils.isValidToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("Authentication set for user: " + userDetails.getUsername());
            } else {
                System.out.println("Token is not valid or user details are null");
            }
        }

        filterChain.doFilter(request, response);
    }
}