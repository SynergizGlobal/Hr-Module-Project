package hr_module.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {
    @GetMapping("user-info")
    public Map<String, Object> user (@AuthenticationPrincipal OAuth2User principal) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && principal != null) {
            return principal.getAttributes();
        }
        else {
            return Collections.emptyMap(); // or you could return null
        }
    }

}
