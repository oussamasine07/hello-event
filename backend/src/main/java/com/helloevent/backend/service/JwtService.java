package com.helloevent.backend.service;

import com.helloevent.backend.dto.AuthUserDTO;
import com.helloevent.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private String secretKey;

    public JwtService () {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private SecretKey getKeys () {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extarctUsername (String token) {
        return extarctClaims(token, Claims::getSubject);
    }

    private <T> T extarctClaims(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKeys())
                .build()
                .parseSignedClaims(token)
                .getPayload();

    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extarctUsername(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired( String token ) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extarctClaims(token, Claims::getExpiration);
    }

    public String generateJwtToken (AuthUserDTO authUser) {
        System.out.println(authUser.email());
        System.out.println(authUser.username());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", authUser.id());
        claims.put("firstName", authUser.firstName());
        claims.put("lastName", authUser.lastName());
        claims.put("username", authUser.username());
        claims.put("email", authUser.email());
        claims.put("role", authUser.role());

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(authUser.username())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 60 * 40))
                .and()
                .signWith(getKeys())
                .compact();

    }



}
