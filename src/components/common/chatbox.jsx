import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // ✅ Replace with your backend URL

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // ✅ Listen for messages from backend
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { text: data.text, sender: "server" }]);
    });

    return () => {
      socket.off("receive_message"); // cleanup
    };
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (input.trim() === "") return;

    // ✅ Emit message to backend
    socket.emit("send_message", { text: input });

    // Show instantly in UI as user's message
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput(""); // ✅ Clear input after sending
  };

  // ✅ Clear all messages
  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-2xl"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">Chat Support</span>
            <div className="flex gap-2">
              <button
                onClick={clearMessages}
                className="bg-redqA-500 px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                Clear
              </button>
              <button onClick={toggleChat} className="text-white text-lg">
                ✖
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-1 p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-2 flex border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
