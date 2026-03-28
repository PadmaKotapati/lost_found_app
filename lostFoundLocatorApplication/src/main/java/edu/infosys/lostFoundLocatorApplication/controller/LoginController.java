package edu.infosys.lostFoundLocatorApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import edu.infosys.lostFoundLocatorApplication.bean.LostfounderUser;
import edu.infosys.lostFoundLocatorApplication.dao.LostfoundUserRepository;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/lostfound")
public class LoginController {

    @Autowired
    private LostfoundUserService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private LostfoundUserRepository repository;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody LostfounderUser user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(user);

        return ResponseEntity.ok("User Registered Successfully");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<String> validateUser(
            @RequestBody LostfounderUser loginUser,
            HttpServletRequest request) {

        try {

            // 🔍 Fetch user from DB
            LostfounderUser dbUser = repository.findById(loginUser.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // ================= 🔥 FIX OLD PASSWORD =================
            if (!dbUser.getPassword().startsWith("$2a$")) {

                // OLD plain password case
                if (dbUser.getPassword().equals(loginUser.getPassword())) {

                    // ✅ Convert to encoded password
                    dbUser.setPassword(passwordEncoder.encode(loginUser.getPassword()));
                    repository.save(dbUser);

                } else {
                    return ResponseEntity.status(401).body("Invalid Username or Password");
                }
            }

            // ================= AUTHENTICATION =================
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    loginUser.getUsername(),
                                    loginUser.getPassword()
                            )
                    );

            // Set authentication
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Create session
            HttpSession session = request.getSession(true);
            session.setAttribute(
                    "SPRING_SECURITY_CONTEXT",
                    SecurityContextHolder.getContext()
            );

            // Get role
            String role = service.getRole();

            return ResponseEntity.ok(role);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid Username or Password");
        }
    }

    // ================= GET CURRENT USER =================
    @GetMapping("/me")
    public LostfounderUser getUser() {
        return service.getUser();
    }

    // ================= GET ROLE =================
    @GetMapping("/role")
    public String getRole() {
        return service.getRole();
    }

    // ================= DELETE USER =================
    @DeleteMapping("/user/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {

        repository.deleteById(username);

        return ResponseEntity.ok("User Deleted Successfully");
    }

    // ================= LOGOUT =================
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {

        SecurityContextHolder.clearContext();

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok("Logout Successful");
    }
}