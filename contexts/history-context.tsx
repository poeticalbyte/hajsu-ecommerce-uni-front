"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"

export type HistoryActionType = 
  | "task_created"
  | "task_updated"
  | "task_deleted"
  | "task_completed"
  | "task_uncompleted"
  | "subtask_created"
  | "subtask_updated"
  | "subtask_deleted"
  | "subtask_completed"
  | "subtask_uncompleted"

export interface HistoryEntry {
  id: string
  action_type: HistoryActionType
  task_id: string | null
  subtask_id: string | null
  previous_state: Record<string, unknown> | null
  new_state: Record<string, unknown> | null
  description: string
  created_at: string
  undone: boolean
  undone_at: string | null
}

interface HistoryContextType {
  history: HistoryEntry[]
  currentIndex: number
  canUndo: boolean
  canRedo: boolean
  isLoading: boolean
  undo: () => Promise<void>
  redo: () => Promise<void>
  addHistoryEntry: (entry: Omit<HistoryEntry, "id" | "created_at" | "undone" | "undone_at">) => Promise<void>
  refreshHistory: () => Promise<void>
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

export function HistoryProvider({ children, userId }: { children: ReactNode; userId: string }) {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const refreshHistory = useCallback(async () => {
    const { data, error } = await supabase
      .from("task_history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(100)

    if (error) {
      console.error("[v0] Error fetching history:", error)
      return
    }

    setHistory(data || [])
    // Find the last non-undone entry index
    const lastActiveIndex = (data || []).reduce((acc, entry, idx) => {
      return entry.undone ? acc : idx
    }, -1)
    setCurrentIndex(lastActiveIndex)
  }, [supabase, userId])

  useEffect(() => {
    refreshHistory()
  }, [refreshHistory])

  const addHistoryEntry = useCallback(async (
    entry: Omit<HistoryEntry, "id" | "created_at" | "undone" | "undone_at">
  ) => {
    const { error } = await supabase
      .from("task_history")
      .insert({
        ...entry,
        user_id: userId,
      })

    if (error) {
      console.error("[v0] Error adding history entry:", error)
      return
    }

    await refreshHistory()
  }, [supabase, userId, refreshHistory])

  const undo = useCallback(async () => {
    if (currentIndex < 0 || isLoading) return
    
    setIsLoading(true)
    const entryToUndo = history[currentIndex]
    
    try {
      // Restore previous state based on action type
      switch (entryToUndo.action_type) {
        case "task_created":
          // Delete the created task
          if (entryToUndo.task_id) {
            await supabase.from("tasks").delete().eq("id", entryToUndo.task_id)
          }
          break
          
        case "task_deleted":
          // Restore the deleted task
          if (entryToUndo.previous_state) {
            const { id, ...taskData } = entryToUndo.previous_state as { id: string; [key: string]: unknown }
            await supabase.from("tasks").insert({ id, ...taskData, user_id: userId })
          }
          break
          
        case "task_updated":
        case "task_completed":
        case "task_uncompleted":
          // Restore previous task state
          if (entryToUndo.task_id && entryToUndo.previous_state) {
            const { id, user_id, ...updateData } = entryToUndo.previous_state as { id: string; user_id: string; [key: string]: unknown }
            await supabase.from("tasks").update(updateData).eq("id", entryToUndo.task_id)
          }
          break
          
        case "subtask_created":
          // Delete the created subtask
          if (entryToUndo.subtask_id) {
            await supabase.from("subtasks").delete().eq("id", entryToUndo.subtask_id)
          }
          break
          
        case "subtask_deleted":
          // Restore the deleted subtask
          if (entryToUndo.previous_state) {
            const { id, ...subtaskData } = entryToUndo.previous_state as { id: string; [key: string]: unknown }
            await supabase.from("subtasks").insert({ id, ...subtaskData })
          }
          break
          
        case "subtask_updated":
        case "subtask_completed":
        case "subtask_uncompleted":
          // Restore previous subtask state
          if (entryToUndo.subtask_id && entryToUndo.previous_state) {
            const { id, ...updateData } = entryToUndo.previous_state as { id: string; [key: string]: unknown }
            await supabase.from("subtasks").update(updateData).eq("id", entryToUndo.subtask_id)
          }
          break
      }

      // Mark entry as undone
      await supabase
        .from("task_history")
        .update({ undone: true, undone_at: new Date().toISOString() })
        .eq("id", entryToUndo.id)

      await refreshHistory()
    } catch (error) {
      console.error("[v0] Error during undo:", error)
    } finally {
      setIsLoading(false)
    }
  }, [currentIndex, history, isLoading, supabase, userId, refreshHistory])

  const redo = useCallback(async () => {
    const nextIndex = currentIndex + 1
    if (nextIndex >= history.length || !history[nextIndex]?.undone || isLoading) return
    
    setIsLoading(true)
    const entryToRedo = history[nextIndex]
    
    try {
      // Apply new state based on action type
      switch (entryToRedo.action_type) {
        case "task_created":
          // Re-create the task
          if (entryToRedo.new_state) {
            const { id, ...taskData } = entryToRedo.new_state as { id: string; [key: string]: unknown }
            await supabase.from("tasks").insert({ id, ...taskData, user_id: userId })
          }
          break
          
        case "task_deleted":
          // Delete the task again
          if (entryToRedo.task_id) {
            await supabase.from("tasks").delete().eq("id", entryToRedo.task_id)
          }
          break
          
        case "task_updated":
        case "task_completed":
        case "task_uncompleted":
          // Apply new task state
          if (entryToRedo.task_id && entryToRedo.new_state) {
            const { id, user_id, ...updateData } = entryToRedo.new_state as { id: string; user_id: string; [key: string]: unknown }
            await supabase.from("tasks").update(updateData).eq("id", entryToRedo.task_id)
          }
          break
          
        case "subtask_created":
          // Re-create the subtask
          if (entryToRedo.new_state) {
            const { id, ...subtaskData } = entryToRedo.new_state as { id: string; [key: string]: unknown }
            await supabase.from("subtasks").insert({ id, ...subtaskData })
          }
          break
          
        case "subtask_deleted":
          // Delete the subtask again
          if (entryToRedo.subtask_id) {
            await supabase.from("subtasks").delete().eq("id", entryToRedo.subtask_id)
          }
          break
          
        case "subtask_updated":
        case "subtask_completed":
        case "subtask_uncompleted":
          // Apply new subtask state
          if (entryToRedo.subtask_id && entryToRedo.new_state) {
            const { id, ...updateData } = entryToRedo.new_state as { id: string; [key: string]: unknown }
            await supabase.from("subtasks").update(updateData).eq("id", entryToRedo.subtask_id)
          }
          break
      }

      // Mark entry as not undone
      await supabase
        .from("task_history")
        .update({ undone: false, undone_at: null })
        .eq("id", entryToRedo.id)

      await refreshHistory()
    } catch (error) {
      console.error("[v0] Error during redo:", error)
    } finally {
      setIsLoading(false)
    }
  }, [currentIndex, history, isLoading, supabase, userId, refreshHistory])

  const canUndo = currentIndex >= 0 && !isLoading
  const canRedo = currentIndex < history.length - 1 && history[currentIndex + 1]?.undone && !isLoading

  return (
    <HistoryContext.Provider value={{
      history,
      currentIndex,
      canUndo,
      canRedo,
      isLoading,
      undo,
      redo,
      addHistoryEntry,
      refreshHistory,
    }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (context === undefined) {
    throw new Error("useHistory must be used within a HistoryProvider")
  }
  return context
}
