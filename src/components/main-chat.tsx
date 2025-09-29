"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, User, Bot, Paperclip, Terminal } from "lucide-react"
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

  const examplePrompts = [
    "Find the best flights from SFO to LAX for next weekend",
    "Summarize the latest news on AI",
    "What was the score of the last Lakers game?",
    "Create a recipe for a vegan chocolate cake",
  ]

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ScrollArea className="flex-1">
        {chatHasStarted ? (
          <div className="px-4 py-8">
            <div className="flex flex-col gap-6">
              {messages.map((message) => {
                if (message.type === "system") {
                  if (messages.indexOf(message) === 0) return null
                  return (
                    <div
                      key={message.id}
                      className="flex items-center gap-3 justify-center text-xs text-muted-foreground font-mono"
                    >
                      <Terminal className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{message.content}</span>
                      <div className="flex-grow border-t border-dashed mx-4"></div>
                      <span className="text-muted-foreground/50">
                        {message.timestamp}
                      </span>
                    </div>
                  )
                }

                const isUser = message.type === "user"
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start gap-3",
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
                        "p-3 rounded-lg max-w-md lg:max-w-xl shadow-sm",
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-card border rounded-bl-none"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className="text-xs text-right mt-2 opacity-70">
                        {message.timestamp}
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
                <div className="flex items-start gap-3">
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
        ) : (
          <div className="flex flex-col justify-center p-4 h-full">
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-4 mt-12">
              <div className="p-3 border rounded-full bg-background">
                <Icons.logo className="h-10 w-10" />
              </div>
              <h1 className="text-3xl font-semibold">
                How can I help you today?
              </h1>
              <p className="text-muted-foreground">
                Start a conversation or try one of the examples below.
              </p>
            </div>
            <div className="w-full max-w-4xl mx-auto mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </div>
          </div>
        )}
      </ScrollArea>

      <div className="w-full p-4 border-t bg-background">
        <div className="max-w-4xl mx-auto">
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
    </div>
  )
}