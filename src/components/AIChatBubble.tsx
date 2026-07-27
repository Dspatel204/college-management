"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { MessageSquare, Send, Bot, X, Loader2, Check, CheckCheck, Sun, Moon, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-provider"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const collegeResponses: Record<string, string> = {
  attendance:
    "Attendance check karne ke liye **Attendance** section mein jayein. Wahan aap apni daily attendance dekh sakte hain aur agar koi class miss ho gayi hai to wo bhi show hoti hai. Regular attendance maintain karna marks mein help karta hai!",

  fees:
    "Fee-related queries ke liye **Fee Management** section use karein. Wahan aap pending fees check kar sakte hain, online payment kar sakte hain aur receipt download bhi kar sakte hain. Agar koi problem ho to accounts department se contact karein.",

  exam:
    "Exams ke baare mein pooch rahe hain? **Examinations** section mein aapko exam schedule, admit card, aur results sab kuch available hai. Exam dates aur syllabus ke liye wahan check karein.",

  course:
    "Courses ke liye **Courses** section mein jayein. Wahan aap apne enrolled subjects, syllabus, aur faculty details dekh sakte hain. Agar course change ya add karna ho to academic office se baat karein.",

  library:
    "Library services ke liye **Library** section use karein. Wahan aap books search kar sakte hain, issued books check kar sakte hain, aur due date bhi dekh sakte hain. Maximum 3 books ek saath issue ki ja sakti hain.",

  transport:
    "Transport facility ke liye **Transport** section check karein. Wahan bus routes, timings, aur route map available hai. Agar koi bus miss ho ya complaint ho to transport department se contact karein.",

  notice:
    "Latest notices ke liye **Notice Board** section dekhein. Wahan exam dates, holidays, events, aur important announcements regularly update hote hain. Regular check karna mat bhulein!",

  report:
    "Reports generate karne ke liye **Reports** section use karein. Wahan aap attendance report, fee report, exam report, aur academic performance report bana sakte hain. PDF format mein download bhi kar sakte hain.",

  help:
    "Main aapki madad karne ke liye taiyaar hoon! Aap mujhse kuch bhi pooch sakte hain:\n\n• **Attendance** - Daily attendance check\n• **Fees** - Payment aur dues\n• **Exams** - Schedule aur results\n• **Courses** - Subjects aur syllabus\n• **Library** - Books search aur issue\n• **Transport** - Bus routes aur timings\n• **Notices** - Latest updates\n\nBataiye kya chahiye? 😊",

  default:
    "Maaf kijiye, main is topic par detail mein jawab nahi de sakta. Lekin main aapko attendance, fees, exams, courses, library, transport, ya notices ke baarein mein help kar sakta hoon. Kya inmein se kuch poochna hai?",
}

const keywordMap: Record<string, string> = {
  attendance: "attendance present absent proxy",
  fees: "fee fees payment pending dues scholarship",
  exam: "exam examination test result semester",
  course: "course subject syllabus faculty professor",
  library: "library book issue due fine return",
  transport: "transport bus route timing pickup",
  notice: "notice announcement news holiday event",
  report: "report generate download pdf marks",
  help: "help assist support guide how",
}

const quickActions = [
  { label: "Check Attendance", query: "How to check my attendance?", icon: "📋" },
  { label: "Pay Fees", query: "How to pay fees online?", icon: "💳" },
  { label: "Exam Schedule", query: "When are exams scheduled?", icon: "📅" },
  { label: "Library Books", query: "How to issue library books?", icon: "📚" },
  { label: "Bus Route", query: "What is my bus route and timing?", icon: "🚌" },
  { label: "Download Report", query: "How to download my report card?", icon: "📊" },
]

function matchResponse(input: string): string {
  const lower = input.toLowerCase()
  let bestMatch = "default"
  let bestScore = 0

  for (const [key, keywords] of Object.entries(keywordMap)) {
    const words = keywords.split(" ")
    let score = 0
    for (const word of words) {
      if (lower.includes(word)) score++
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = key
    }
  }

  return collegeResponses[bestMatch]
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:300ms]" />
    </div>
  )
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export function AIChatBubble() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `${getGreeting()}! I'm your CollegeHub Assistant. How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setHasInteracted(true)

    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1000))

    const assistantContent = matchResponse(messageText)
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: assistantContent,
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (query: string) => {
    handleSend(query)
  }

  const showQuickActions = !hasInteracted && messages.length <= 1

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className={cn(
            "fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full shadow-lg transition-all duration-300 ease-out",
            "bg-gray-900 text-white hover:shadow-xl hover:scale-110 active:scale-95",
            "dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          )}
          size="icon"
        >
          <div className="relative">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
          </div>
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      )}

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-5 right-5 z-40 flex flex-col overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 ease-out",
          "h-[600px] w-[380px]",
          "md:bottom-6 md:right-6 md:h-[640px] md:w-[420px]",
          "border border-gray-200 dark:border-gray-700",
          "bg-white dark:bg-gray-900",
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                <AvatarFallback className="bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                </AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-green-500 dark:border-gray-900">
                <span className="h-1.5 w-1.5 rounded-full bg-green-300"></span>
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 sm:text-base">CollegeHub Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                </span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Always online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close chat</span>
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 bg-gray-50 dark:bg-gray-950 px-4 py-4 sm:px-5" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2.5",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex max-w-[85%] flex-col sm:max-w-[80%]">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      message.role === "user"
                        ? "rounded-tr-sm bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "rounded-tl-sm bg-white text-gray-800 shadow-sm border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800"
                    )}
                  >
                    {message.content.split("**").map((part, index) =>
                      index % 2 === 1 ? (
                        <strong key={index} className="font-semibold text-gray-900 dark:text-gray-100">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </div>
                  <div className={cn(
                    "mt-1 flex items-center gap-1.5 px-1",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <TypingIndicator />
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 px-1">typing...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3.5 sm:px-5 sm:py-4">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Quick Actions
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSuggestionClick(action.query)}
                  className="flex items-center gap-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-left text-xs font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750 hover:shadow-sm active:scale-[0.98]"
                >
                  <span className="text-base">{action.icon}</span>
                  <span className="leading-tight">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="h-10 flex-1 rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-gray-100 transition-all focus-visible:ring-1 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600 focus-visible:bg-white dark:focus-visible:bg-gray-750 focus-visible:border-gray-300 dark:focus-visible:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className={cn(
                "h-10 w-10 shrink-0 rounded-full transition-all duration-200",
                input.trim() && !isTyping
                  ? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 hover:scale-105 active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
              )}
              size="icon"
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <p className="text-center text-[10px] text-gray-400 dark:text-gray-500">
              CollegeHub Assistant • Demo responses
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
