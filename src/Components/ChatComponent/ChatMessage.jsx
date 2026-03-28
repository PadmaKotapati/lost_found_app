import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserDetails, getRole } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import "./ChatMessage.css";

const ChatMessage = () => {

  const navigate = useNavigate();
  const clientRef = useRef(null); // ✅ prevent multiple connections

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  // 🔹 Fetch user + connect ONCE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getUserDetails();
        const roleRes = await getRole();

        const user = userRes.data?.username || userRes.data;
        setUsername(user);
        setRole(roleRes.data);

        connect(user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate(); // ✅ cleanup
      }
    };
  }, []);

  // 🔹 Connect WebSocket (ONLY ONCE)
  const connect = (user) => {

    if (clientRef.current) return; // ✅ prevent duplicate connection

    const socket = new SockJS("http://localhost:9595/lostFound/ws");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✅ Connected");
        setConnected(true);

        // ✅ Subscribe messages
        stompClient.subscribe("/topic/messages", (msg) => {
          const message = JSON.parse(msg.body);

          setMessages((prev) => {
            // ✅ Avoid duplicates
            const exists = prev.some(
              (m) =>
                m.sender === message.sender &&
                m.content === message.content
            );
            if (exists) return prev;

            return [...prev, message];
          });
        });

        // ✅ Register user
        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: user })
        });
      }
    });

    stompClient.activate();
    clientRef.current = stompClient;
  };

  // 🔹 Send message (NO DUPLICATE)
  const sendMessage = () => {
    if (
      clientRef.current &&
      clientRef.current.connected &&
      input.trim() !== ""
    ) {
      const message = {
        sender: username,
        content: input
      };

      clientRef.current.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(message)
      });

      setInput(""); // ❌ do NOT manually add message
    }
  };

  // 🔹 Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // 🔹 Navigation
  const returnBack = () => {
    if (role === "Admin") navigate("/admin-menu");
    else navigate("/student-menu");
  };

  return (
    <div className="chat-container">

      {/* Header */}
      <div className="chat-header">
        <button onClick={returnBack}>⬅ Back</button>
        <h3>Chat Room</h3>
      </div>

      {/* Status */}
      <div className="status">
        {connected ? "🟢 Connected" : "🔴 Connecting..."}
      </div>

      {/* Messages */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === username ? "my-message" : "other-message"
            }
          >
            <span className="sender">{msg.sender}</span>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={!connected}>
          Send
        </button>
      </div>

    </div>
  );
};

export default ChatMessage;