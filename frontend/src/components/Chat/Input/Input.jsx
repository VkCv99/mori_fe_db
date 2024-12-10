import React from "react";
import { Send } from "lucide-react";

function ChatInput({ inputText, setInputText, handleSendMessage }) {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        className="flex-1 bg-gray-700 text-black border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="bg-primary text-white rounded-full p-2 hover:bg-light-gray hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <Send size={20} />
      </button>
    </div>
  );
}

export default ChatInput;
