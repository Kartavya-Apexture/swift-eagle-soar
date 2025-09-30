"use client"

import * as React from "react"
import { MainChat } from "@/components/main-chat"
import { LiveBrowser } from "@/components/live-browser"
import { useChat } from "@/hooks/use-chat"

export default function ChatPage() {
  const { messages, isThinking, sendMessage } = useChat()
  const [showBrowser, setShowBrowser] = React.useState(false)

  const handleSendMessage = (content: string) => {
    // The useChat hook handles the async logic
    sendMessage(content)
  }

  // This effect will sync the browser's visibility with the agent's "thinking" state.
  React.useEffect(() => {
    // We only want to show the browser if a conversation is active.
    if (messages.length > 1) {
      setShowBrowser(isThinking)
    }
  }, [isThinking, messages.length])

  return (
    <div className="flex-1 flex flex-row border-x h-full">
      <div className="flex-1 flex flex-col">
        <MainChat
          messages={messages}
          onSendMessage={handleSendMessage}
          isThinking={isThinking}
        />
      </div>
      {showBrowser && (
        <div className="w-2/5 max-w-md border-l">
          <LiveBrowser />
        </div>
      )}
    </div>
  )
}