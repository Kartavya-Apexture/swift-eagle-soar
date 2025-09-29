"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { MainChat } from "@/components/main-chat"
import { LiveBrowser } from "@/components/live-browser"
import { type Message } from "@/types"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const initialMessages: Message[] = [
  {
    id: crypto.randomUUID(),
    type: "system",
    content: "Agent session started",
    timestamp: format(new Date(), "HH:mm"),
  },
]

export default function Home() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [isThinking, setIsThinking] = React.useState(false)
  const [showBrowser, setShowBrowser] = React.useState(false)

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      content,
      timestamp: format(new Date(), "HH:mm"),
    }
    addMessage(userMessage)
    setIsThinking(true)
    setShowBrowser(true) // Show browser when agent starts working

    // Simulate agent actions and response over 60 seconds
    setTimeout(() => {
      const agentGreeting: Message = {
        id: crypto.randomUUID(),
        type: "agent",
        content: `Hello! I can help with that. I'll start by looking for "${content}".`,
        timestamp: format(new Date(), "HH:mm"),
      }
      addMessage(agentGreeting)
    }, 1000)

    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        type: "system",
        content: `Navigated to google.com`,
        timestamp: format(new Date(), "HH:mm"),
      })
    }, 5000)

    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        type: "system",
        content: `Typed "${content}" into the search bar`,
        timestamp: format(new Date(), "HH:mm"),
      })
    }, 10000)

    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        type: "system",
        content: `Analyzing search results...`,
        timestamp: format(new Date(), "HH:mm"),
      })
    }, 15000)

    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        type: "system",
        content: `Clicked on the first link.`,
        timestamp: format(new Date(), "HH:mm"),
      })
    }, 25000)

    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        type: "system",
        content: `Scrolling down the page to find relevant information.`,
        timestamp: format(new Date(), "HH:mm"),
      })
    }, 35000)

    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        type: "system",
        content: `Extracting key details from the page.`,
        timestamp: format(new Date(), "HH:mm"),
      })
    }, 45000)

    setTimeout(() => {
      const agentMessage: Message = {
        id: crypto.randomUUID(),
        type: "agent",
        content: `Session Timeout. The browser session is now closed.`,
        timestamp: format(new Date(), "HH:mm"),
      }
      addMessage(agentMessage)
      setIsThinking(false)
      setShowBrowser(false) // Hide browser when agent is finished
    }, 60000)
  }

  return (
    <div className="bg-muted/40 flex justify-center">
      <div className="flex w-full max-w-[1440px] bg-background shadow-lg h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col border-x">
          {showBrowser && (
            <div className="h-1/2 border-b">
              <LiveBrowser />
            </div>
          )}
          <div
            className={cn(
              "flex flex-col",
              showBrowser ? "h-1/2" : "h-full"
            )}
          >
            <MainChat
              messages={messages}
              onSendMessage={sendMessage}
              isThinking={isThinking}
            />
          </div>
        </main>
      </div>
    </div>
  )
}