export type Message = {
  id: string
  type: "user" | "agent" | "system"
  content: string
  timestamp: string
  avatar?: string
}