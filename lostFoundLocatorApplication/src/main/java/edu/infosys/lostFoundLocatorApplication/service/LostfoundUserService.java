package edu.infosys.lostFoundLocatorApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.bean.LostfounderUser;
import edu.infosys.lostFoundLocatorApplication.dao.LostfoundUserRepository;

@Service
public class LostfoundUserService implements UserDetailsService {

    @Autowired
    private LostfoundUserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String userId;
    private String role;
    private LostfounderUser user;

    public void saveUser(LostfounderUser user1) {

        // Encode password before saving
        user1.setPassword(passwordEncoder.encode(user1.getPassword()));

        repository.save(user1);
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        this.user = repository.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + username));

        this.userId = user.getUsername();
        this.role = user.getRole();

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }

    public String getUserId() {
        return userId;
    }

    public String getRole() {
        return role;
    }

    public LostfounderUser getUser() {
        return user;
    }

    public void deleteUser(String id) {
        repository.deleteById(id);
    }
}