"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, User, Bot, Terminal, Paperclip } from "lucide-react"
import { type Message } from "@/types"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/icons"
import TextareaAutosize from "react-textarea-autosize"

interface MainChatProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isThinking: boolean
}

export function MainChat({
  messages,
  onSendMessage,
  isThinking,
}: MainChatProps) {
  const [input, setInput] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleExamplePrompt = (prompt: string) => {
    setInput(prompt)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const chatHasStarted = messages.length > 1

  if (!chatHasStarted) {
    const examplePrompts = [
      "Find the best flights from SFO to LAX for next weekend",
      "Summarize the latest news on AI",
      "What was the score of the last Lakers game?",
      "Create a recipe for a vegan chocolate cake",
    ]

    return (
      <div className="flex-1 flex flex-col justify-between p-4 md:p-8 h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <Icons.logo className="h-12 w-12" />
              <h1 className="text-4xl font-bold">Agent Mode</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleExamplePrompt(prompt)}
                  className="p-4 bg-card border rounded-lg text-left hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <p className="text-sm font-medium">{prompt}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto pt-4">
          <div className="w-full rounded-xl border bg-card p-2 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>
            <TextareaAutosize
              rows={1}
              placeholder="Ask anything..."
              className="w-full resize-none bg-transparent text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              minRows={1}
              maxRows={5}
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 rounded-full flex-shrink-0"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <ArrowUp className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ScrollArea className="flex-1">
        <div className="h-full flex flex-col justify-end">
          <div className="flex flex-col gap-6 py-8 px-4">
            {messages.map((message) => {
              if (message.type === "system" && messages.indexOf(message) === 0) {
                return null
              }
              if (message.type === "system") {
                return (
                  <div
                    key={message.id}
                    className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
                  >
                    <Terminal className="h-4 w-4" />
                    <span>{message.content}</span>
                  </div>
                )
              }
              if (message.type === "agent") {
                return (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1.5">
                      <div className="p-3 rounded-lg bg-card border max-w-md">
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                )
              }
              if (message.type === "user") {
                return (
                  <div
                    key={message.id}
                    className="flex items-start gap-3 justify-end"
                  >
                    <div className="flex flex-col gap-1.5 items-end">
                      <div className="p-3 rounded-lg bg-primary text-primary-foreground max-w-md">
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </p>
                    </div>
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )
              }
              return null
            })}
            {isThinking && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg max-w-md bg-card border">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>

      <div className="w-full p-4 border-t bg-background">
        <div className="w-full rounded-xl border bg-card p-2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full flex-shrink-0"
            disabled={isThinking}
          >
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <TextareaAutosize
            rows={1}
            placeholder="Ask anything..."
            className="w-full resize-none bg-transparent text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
            minRows={1}
            maxRows={5}
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full flex-shrink-0"
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
          >
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}