package edu.infosys.lostFoundLocatorApplication.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.infosys.lostFoundLocatorApplication.bean.LostfounderUser;
import edu.infosys.lostFoundLocatorApplication.dao.LostfoundUserRepository;

@RestController
@RequestMapping("/lostfound/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    @Autowired
    private LostfoundUserRepository userRepository;

    // ==========================================
    // ✅ GET USER PROFILE
    // ==========================================
    @GetMapping("/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {

        try {
            Optional<LostfounderUser> user = userRepository.findById(username);

            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            } else {
                return ResponseEntity.status(404).body("User not found ❌");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching user ❌");
        }
    }

    // ==========================================
    // ✅ UPDATE USER PROFILE
    // ==========================================
    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(
            @PathVariable String username,
            @RequestBody LostfounderUser updatedUser) {

        try {
            Optional<LostfounderUser> optionalUser = userRepository.findById(username);

            if (!optionalUser.isPresent()) {
                return ResponseEntity.status(404).body("User not found ❌");
            }

            LostfounderUser existingUser = optionalUser.get();

            // ✅ Update only allowed fields
            existingUser.setPersonalName(updatedUser.getPersonalName());
            existingUser.setEmail(updatedUser.getEmail());

            userRepository.save(existingUser);

            return ResponseEntity.ok("Profile updated successfully ✅");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Update failed ❌");
        }
    }
}