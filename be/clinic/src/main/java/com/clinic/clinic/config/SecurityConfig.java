    package com.clinic.clinic.config;

    import com.clinic.clinic.security.JWTAuthFilter;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.HttpStatus;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
    import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

    @Configuration
    @EnableMethodSecurity
    @EnableWebSecurity
    public class SecurityConfig {

        private final JWTAuthFilter jwtAuthFilter;

        public SecurityConfig(JWTAuthFilter jwtAuthFilter) {
            this.jwtAuthFilter = jwtAuthFilter;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable())  // Tắt CSRF cho API (cần thiết cho Stateless API)
                    .authorizeHttpRequests(authorize -> authorize
                            .requestMatchers("/admin/register", "/auth/login").permitAll()
                            .requestMatchers("/admin/**").hasRole("ADMIN")
                            .requestMatchers("/doctors/update/{id}").hasAnyRole("DOCTOR","ADMIN")
                            .requestMatchers("/receptions/update/{id}").hasAnyRole("RECEPTIONIST","ADMIN")
                            .requestMatchers("/patients/**").hasAnyRole("ADMIN","RECEPTIONIST")
                            .requestMatchers("/news/add","/news/update/","news/delete/{id}").hasAnyRole("ADMIN")
                            .requestMatchers("/news/all", "/news/{id}","/news/increment-views/{id}").permitAll()
                            .requestMatchers("/schedules/book-appointment").permitAll()
                            .requestMatchers("/doctors/**","/receptions/**","/departments/**",
                                    "/schedules/**","equipments/**","/medicines/**").hasRole("ADMIN")

                            .anyRequest().authenticated()
                    )
                    .sessionManagement(session -> session
                            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Không sử dụng session
                    )
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Thêm JWTAuthFilter trước UsernamePasswordAuthenticationFilter

            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();  // Sử dụng BCrypt cho việc mã hóa mật khẩu
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
            return configuration.getAuthenticationManager();  // Cung cấp AuthenticationManager
        }
    }
