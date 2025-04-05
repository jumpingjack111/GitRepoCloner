import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a UUID v4
export function generateId() {
  return crypto.randomUUID()
}

// Format a date to YYYY-MM-DD
export function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

// Format a time to HH:MM
export function formatTime(date: Date) {
  return date.toISOString().split('T')[1].substring(0, 5)
}

// Parse a date and time string to a Date object
export function parseDateTime(dateStr: string, timeStr: string) {
  return new Date(`${dateStr}T${timeStr}:00`)
}

// Check if a reminder should be shown
export function shouldShowReminder(reminderTime: Date) {
  const now = new Date()
  const fiveMinutesBefore = new Date(reminderTime.getTime() - 5 * 60 * 1000)
  return now >= fiveMinutesBefore && now <= reminderTime
}
