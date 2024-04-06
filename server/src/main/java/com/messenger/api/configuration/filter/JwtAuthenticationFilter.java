package com.messenger.api.configuration.filter;

import com.messenger.api.service.JwtService;
import com.messenger.api.service.UserService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";
    public static final RequestMatcher ignoredPaths = new AntPathRequestMatcher("/api/v1/auth/**");
    public static final RequestMatcher wsPath = new AntPathRequestMatcher("/ws/**");
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader(HEADER_NAME);

        if ((!StringUtils.hasText(authHeader) ||
                !StringUtils.startsWithIgnoreCase(authHeader, BEARER_PREFIX) ||
                ignoredPaths.matches(request)) && (!wsPath.matches(request)))
        {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = wsPath.matches(request) ? request.getParameter("token") : authHeader.substring(BEARER_PREFIX.length());
        String username;

        try {
            username = jwtService.extractUserName(jwt);
        }catch (JwtException e){
            filterChain.doFilter(request, response);
            return;
        }
        if (StringUtils.hasText(username) && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails;
            try {
                userDetails = userService
                        .userDetailsService()
                        .loadUserByUsername(username);
            } catch (UsernameNotFoundException e){
                filterChain.doFilter(request, response);
                return;
            }
            if (jwtService.isTokenValid(jwt, userDetails)) {
                SecurityContext context = SecurityContextHolder.createEmptyContext();

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                context.setAuthentication(authToken);
                SecurityContextHolder.setContext(context);
            }
        }
        filterChain.doFilter(request, response);
    }

    public JwtAuthenticationFilter(JwtService jwtService, UserService userService){
        this.jwtService = jwtService;
        this.userService = userService;
    }
}
