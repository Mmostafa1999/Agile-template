"use client";

import dynamic from "next/dynamic";

// Dynamically import the ChatBot component with ssr: false since we're in a client component
const ChatBot = dynamic(() => import("@/components/ui/chatbot"), { ssr: false });

export default function ClientChatBot() {
  return <ChatBot />;
} 