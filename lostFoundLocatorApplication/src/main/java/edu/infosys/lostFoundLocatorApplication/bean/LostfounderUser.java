package edu.infosys.lostFoundLocatorApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "lostfound_users")
public class LostfounderUser {

    @Id
    private String username;

    private String password;
    private String personalName;
    private String email;
    private String role;

    // REQUIRED by JPA
    public LostfounderUser() {
    }

    public LostfounderUser(String username, String password,
                           String personalName, String email, String role) {
        this.username = username;
        this.password = password;
        this.personalName = personalName;
        this.email = email;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public String getPersonalName() {
        return personalName;
    }

    public void setPersonalName(String personalName) {
        this.personalName = personalName;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
}
