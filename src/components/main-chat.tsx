"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, User, Bot, Paperclip } from "lucide-react"
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
      <div className="flex-1 flex flex-col justify-center p-4 h-full">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <Icons.logo className="h-12 w-12" />
            <h1 className="text-4xl font-bold">Agent Mode</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {examplePrompts.map((prompt) => (
              <button
                key={prompt}
                className="p-3 border rounded-lg text-left hover:bg-muted transition-colors text-sm"
                onClick={() => handleExamplePrompt(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="w-full rounded-xl border bg-background shadow-sm p-2 flex flex-col mt-4">
            <TextareaAutosize
              rows={1}
              placeholder="Ask anything..."
              className="w-full resize-none bg-transparent px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              minRows={1}
              maxRows={5}
            />
            <div className="flex items-center justify-between mt-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button
                type="submit"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <ArrowUp className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Conversation</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-4 py-8">
          <div className="flex flex-col gap-6">
            {messages.map((message) => {
              if (message.type === "system") {
                if (messages.indexOf(message) === 0) return null
                return (
                  <div key={message.id} className="relative py-2">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-dashed" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-3 text-xs text-muted-foreground">
                        {message.content}
                      </span>
                    </div>
                  </div>
                )
              }

              const isUser = message.type === "user"
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-end gap-3",
                    isUser && "justify-end"
                  )}
                >
                  {!isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-background border">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-lg max-w-2xl shadow-sm",
                      isUser
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-card border rounded-bl-none"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                  {isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )
            })}
            {isThinking && (
              <div className="flex items-end gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-background border">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-card border rounded-bl-none shadow-sm">
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
        <div className="w-full rounded-xl border bg-background shadow-sm p-2 flex flex-col">
          <TextareaAutosize
            rows={1}
            placeholder="Ask anything..."
            className="w-full resize-none bg-transparent px-4 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
            minRows={1}
            maxRows={5}
          />
          <div className="flex items-center justify-between mt-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              disabled={isThinking}
            >
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={handleSend}
              disabled={!input.trim() || isThinking}
            >
              <ArrowUp className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}