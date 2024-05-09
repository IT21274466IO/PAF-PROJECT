package com.sliit.social_media_project.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Slf4j
public class JwtValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(request.getServletPath().equals("/auth/login") || request.getServletPath().equals("/auth/signup")){
            filterChain.doFilter(request, response);
            return;
        }else {
            log.info("request : "+ request.getServletPath());
            String jwt = request.getHeader("Authorization");
            if(jwt != null){
                try {
                    log.info("1"+jwt);
                    String email = JwtProvider.getEmailFromJwtToken(jwt);
                    log.info("2. "+email);
                    List<GrantedAuthority>authorities = new ArrayList<>();
                    Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
                    log.info("3. "+authentication);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.info("4. "+SecurityContextHolder.getContext().getAuthentication());
                } catch (Exception e) {
                    log.error(e.getMessage());
                    throw new BadCredentialsException("Invalid token ......");
                }
            } else {
                throw new BadCredentialsException("Please provide a valid token ......");
            }

            filterChain.doFilter(request, response);
        }
    }
}
