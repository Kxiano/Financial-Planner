"use client"

// Simplified version of use-toast
import { useState, useEffect } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let listeners: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

function dispatch(toast: Toast) {
  toasts = [...toasts, toast]
  listeners.forEach((listener) => listener(toasts))
  
  // Auto dismiss after 3 seconds
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id)
    listeners.forEach((listener) => listener(toasts))
  }, 5000)
}

export function useToast() {
  const [activeToasts, setActiveToasts] = useState<Toast[]>(toasts)

  useEffect(() => {
    listeners.push(setActiveToasts)
    return () => {
      listeners = listeners.filter((l) => l !== setActiveToasts)
    }
  }, [])

  return {
    toast: (props: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9)
        dispatch({ ...props, id })
    },
    toasts: activeToasts,
    dismiss: (id: string) => {
        toasts = toasts.filter((t) => t.id !== id)
        listeners.forEach((l) => l(toasts))
    }
  }
}
