package com.shop31.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import javax.servlet.http.Cookie;
import javax.sql.DataSource;
import java.io.PrintWriter;
import java.util.regex.Pattern;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    PasswordEncoder passwordEncoder() {
//        SHA-256 +随机盐+密钥对密码进行加密,过程不可逆
        return new BCryptPasswordEncoder();
//        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/js/**", "/css/**","/img/**","/addProd");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/admin/**").hasRole("admin")
                .antMatchers("/user/**").hasRole("user")
                .anyRequest().authenticated()
                .and()

                .formLogin()
                .loginPage("/login.html").permitAll()
                .loginProcessingUrl("/doLogin").permitAll()
//                .defaultSuccessUrl("/mainpage",true)
                .successHandler((req,resp,authentication)->{
                    Object principal = authentication.getPrincipal();
                    resp.setContentType("application/json;charset=utf-8");

                    Cookie cookie = new Cookie("auth",passwordEncoder().encode("hash_token"));
                    cookie.setSecure(true);
                    cookie.setHttpOnly(true);
                    cookie.setMaxAge(259200); // three day expiration
                    resp.addCookie(cookie);

                    PrintWriter out = resp.getWriter();
                    out.write(new ObjectMapper().writeValueAsString(principal));
                    out.flush();
                    out.close();
                })
                .failureHandler((req, resp, e) -> {
                    resp.setContentType("application/json;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.write(e.getMessage());
                    out.flush();
                    out.close();
                })

                .and()
                .rememberMe()
                .key("echo")
                .tokenRepository(jdbcTokenRepository())
                .and()
                .sessionManagement()
                .sessionFixation().changeSessionId()

                .and()

                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login.html")
//                .logoutSuccessHandler((req, resp, authentication) -> {
//                    resp.setContentType("application/json;charset=utf-8");
//                    resp.sendRedirect("/login.html");
//                    PrintWriter out = resp.getWriter();
//                    out.write("注销成功");
//                    out.flush();
//                    out.close();

//                    resp.getWriter().write("logout already");
//                })
                .invalidateHttpSession(true)
                .deleteCookies("JESESSIONID")
                .deleteCookies("auth")
                .deleteCookies("XSRF-TOKEN")
                .and()
//                .csrf().disable();
//                .defaultSuccessUrl("http://127.0.0.1:8080/mainpage")


//
//                .permitAll()

//                .exceptionHandling()
//                .authenticationEntryPoint((req, resp, authException) -> {
//                    resp.getWriter().write("Login First");
//                    resp.setContentType("application/json;charset=utf-8");
//                    PrintWriter out = resp.getWriter();
//                    out.write("尚未登录，请先登录");
//                    out.flush();
//                    out.close();
//                })

                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }

    @Autowired
    DataSource dataSource;

    @Bean
    JdbcTokenRepositoryImpl jdbcTokenRepository() {
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource);
        return jdbcTokenRepository;
    }


    @Override
    @Bean
    protected UserDetailsService userDetailsService() {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager();
        manager.setDataSource(dataSource);
        if (!manager.userExists("echo@cuhk.com")) {
            manager.createUser(User.withUsername("echo@cuhk.com").password(passwordEncoder().encode("123")).roles("admin").build());
        }
        if (!manager.userExists("ZhiyueLU@cuhk.com")) {
            manager.createUser(User.withUsername("ZhiyueLU@cuhk.com").password(passwordEncoder().encode("123")).roles("user").build());
        }

        return manager;
    }
    @Bean
    RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl hierarchy = new RoleHierarchyImpl();
        hierarchy.setHierarchy("ROLE_admin > ROLE_user");
        return hierarchy;
    }


}
