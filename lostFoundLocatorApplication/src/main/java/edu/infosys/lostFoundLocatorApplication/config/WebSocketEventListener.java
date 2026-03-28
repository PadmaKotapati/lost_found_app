package edu.infosys.lostFoundLocatorApplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import edu.infosys.lostFoundLocatorApplication.controller.ChatController;

@Component
public class WebSocketEventListener {

    @Autowired
    private ChatController chatController;

    @EventListener
    public void handleWebSocketDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        chatController.removeUser(sessionId);
    }
}