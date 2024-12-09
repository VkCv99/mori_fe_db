import React from 'react';
import { Bot, User, HelpCircle } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "common/Tooltip";

const BotMessage = ({ message }) => (
  <div className="flex justify-start">
    <div className="flex-shrink-0 mr-3">
      <Bot size={24} className="text-primary" />
    </div>
    <div className="max-w-xs md:max-w-md rounded-lg p-3 bg-primary text-white">
      <div className="flex items-center justify-between">
        <span>{message.text}</span>
        {message.examples && message.examples.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex-shrink-0 p-1 ml-2 hover:bg-gray-200 rounded-full transition-colors">
                  <HelpCircle className="h-4 w-4 text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-black">
                <p className="mb-2 font-bold">
                  Please provide the input like the below examples:
                </p>
                <ul>
                  {message.examples.map((content, index) => (
                    <li key={index}>{content}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  </div>
);

const UserMessage = ({ message }) => (
  <div className="flex justify-end">
    <div className="max-w-xs md:max-w-md rounded-lg p-3 bg-light-gray text-dusky-teal">
      <span>{message.text}</span>
    </div>
    <div className="flex-shrink-0 ml-3">
      <User size={24} className="text-warm-red" />
    </div>
  </div>
);

const MessageSection = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        message.isBot ? (
          <BotMessage key={index} message={message} />
        ) : (
          <UserMessage key={index} message={message} />
        )
      ))}
    </>
  );
};

export default MessageSection;