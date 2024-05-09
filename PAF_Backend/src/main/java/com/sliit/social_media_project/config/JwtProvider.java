package com.sliit.social_media_project.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.util.Date;
@Slf4j
public class JwtProvider {

    // Generate a secure key for HMAC-SHA256
    private static SecretKey key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);

    public static String generateToken(Authentication auth) {

        String jwt = Jwts.builder()
                .setIssuer("Social Media Project")
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("email", auth.getName())
                .signWith(key)
                .compact();

        return jwt;
    }

    public static String getEmailFromJwtToken(String jwt){

        // Remove "Bearer " prefix if present
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();

        String email = String.valueOf(claims.get("email"));

        return email;
    }
}