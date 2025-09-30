"use client"

import * as React from "react"
import { type Message } from "@/types"
import { format } from "date-fns"

const initialMessages: Message[] = [
  {
    id: crypto.randomUUID(),
    type: "system",
    content: "Agent session started",
    timestamp: format(new Date(), "HH:mm"),
  },
]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useChat() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [isThinking, setIsThinking] = React.useState(false)

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      content,
      timestamp: format(new Date(), "HH:mm"),
    }
    addMessage(userMessage)
    setIsThinking(true)

    await sleep(1000)
    addMessage({
      id: crypto.randomUUID(),
      type: "agent",
      content: `Of course! I'll start by searching for "${content}".`,
      timestamp: format(new Date(), "HH:mm"),
    })

    await sleep(2000)
    addMessage({
      id: crypto.randomUUID(),
      type: "system",
      content: `Navigated to google.com`,
      timestamp: format(new Date(), "HH:mm"),
    })

    await sleep(2000)
    addMessage({
      id: crypto.randomUUID(),
      type: "system",
      content: `Typed "${content}" into the search bar and submitted.`,
      timestamp: format(new Date(), "HH:mm"),
    })

    await sleep(3000)
    addMessage({
      id: crypto.randomUUID(),
      type: "system",
      content: `Analyzing search results...`,
      timestamp: format(new Date(), "HH:mm"),
    })

    await sleep(2500)
    addMessage({
      id: crypto.randomUUID(),
      type: "system",
      content: `Clicked on the most relevant link.`,
      timestamp: format(new Date(), "HH:mm"),
    })

    await sleep(3500)
    addMessage({
      id: crypto.randomUUID(),
      type: "system",
      content: `Extracting key information from the page.`,
      timestamp: format(new Date(), "HH:mm"),
    })

    await sleep(4000)
    const finalMessage: Message = {
      id: crypto.randomUUID(),
      type: "agent",
      content: `I've gathered the information. Here is a summary of what I found...`,
      timestamp: format(new Date(), "HH:mm"),
    }
    addMessage(finalMessage)

    setIsThinking(false)
  }

  return { messages, isThinking, sendMessage }
}