import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi 👋 I am your healthcare assistant!" }
  ]);

  // 🧠 SMART BOT BRAIN
  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello 👋 How can I help you today?";
    }

    if (msg.includes("patient")) {
      return "You can register as a patient using the patient form.";
    }

    if (msg.includes("volunteer")) {
      return "Volunteers help patients and support the system. You can join from the volunteer form.";
    }

    if (msg.includes("help")) {
      return "I can help you with registration, forms, and guidance 😊";
    }

    return "Sorry 🤔 I didn’t understand that. Try asking about patient, volunteer, or help.";
  };

  // 💬 SEND MESSAGE FUNCTION
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };

    const botMsg = {
      type: "bot",
      text: getBotReply(input),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="chatbot-container">

      {open && (
        <div className="whatsapp-chat">
          <div className="chat-header">
            <div className="profile">
              <div className="avatar">🏥</div>
              <div>
                <h4>Healthcare AI</h4>
                <span>online</span>
              </div>
            </div>
          </div>

          {/* CHAT MESSAGES */}
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.type === "user"
                    ? "message user-message"
                    : "message bot-message"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT AREA */}
          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}

      {/* CHAT ICON */}
      <button className="chat-icon" onClick={() => setOpen(!open)}>
        💬
      </button>
    </div>
  );
}