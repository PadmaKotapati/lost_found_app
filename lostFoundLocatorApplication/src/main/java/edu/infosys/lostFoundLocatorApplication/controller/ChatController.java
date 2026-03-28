package edu.infosys.lostFoundLocatorApplication.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import edu.infosys.lostFoundLocatorApplication.bean.ChatMessage;

@RestController
@RequestMapping("/lostfound/")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final Set<String> onlineUsers = Collections.synchronizedSet(new HashSet<>());
    private final Map<String, String> sessionIdToUser = Collections.synchronizedMap(new HashMap<>());

    @GetMapping("/users")
    public Set<String> getOnlineUsers() {
        return onlineUsers;
    }

    @MessageMapping("/register")
    public void register(ChatMessage message, StompHeaderAccessor headerAccessor) {

        String sessionId = headerAccessor.getSessionId();
        String username = message.getSender();

        if (username != null && !username.trim().isEmpty()) {
            onlineUsers.add(username);
            sessionIdToUser.put(sessionId, username);

            messagingTemplate.convertAndSend("/topic/users", onlineUsers);
        }
    }

    // ✅ SEND MESSAGE (ONLY ONCE)
    @MessageMapping("/sendMessage")
    public void sendMessage(ChatMessage message) {
        System.out.println("Sending: " + message.getContent());
        messagingTemplate.convertAndSend("/topic/messages", message);
    }

    public void removeUser(String sessionId) {
        String username = sessionIdToUser.get(sessionId);

        if (username != null) {
            onlineUsers.remove(username);
            sessionIdToUser.remove(sessionId);
            messagingTemplate.convertAndSend("/topic/users", onlineUsers);
        }
    }
}