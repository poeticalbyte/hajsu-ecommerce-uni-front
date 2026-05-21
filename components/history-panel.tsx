"use client"

import { useState } from "react"
import { useHistory, type HistoryEntry, type HistoryActionType } from "@/contexts/history-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Undo2, 
  Redo2, 
  History, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Pencil,
  ChevronRight,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

const actionIcons: Record<HistoryActionType, typeof Plus> = {
  task_created: Plus,
  task_updated: Pencil,
  task_deleted: Trash2,
  task_completed: CheckCircle2,
  task_uncompleted: Circle,
  subtask_created: Plus,
  subtask_updated: Pencil,
  subtask_deleted: Trash2,
  subtask_completed: CheckCircle2,
  subtask_uncompleted: Circle,
}

const actionColors: Record<HistoryActionType, string> = {
  task_created: "text-emerald-500",
  task_updated: "text-blue-500",
  task_deleted: "text-red-500",
  task_completed: "text-emerald-500",
  task_uncompleted: "text-amber-500",
  subtask_created: "text-emerald-400",
  subtask_updated: "text-blue-400",
  subtask_deleted: "text-red-400",
  subtask_completed: "text-emerald-400",
  subtask_uncompleted: "text-amber-400",
}

function HistoryEntryItem({ 
  entry, 
  isActive, 
  isFuture 
}: { 
  entry: HistoryEntry
  isActive: boolean
  isFuture: boolean
}) {
  const Icon = actionIcons[entry.action_type]
  const colorClass = actionColors[entry.action_type]

  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg transition-all",
        isActive && "bg-primary/10 ring-1 ring-primary/20",
        isFuture && "opacity-50",
        entry.undone && "opacity-40"
      )}
    >
      <div className={cn(
        "mt-0.5 p-1.5 rounded-md bg-muted",
        colorClass
      )}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium leading-tight",
          entry.undone && "line-through"
        )}>
          {entry.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
        </p>
      </div>
      {isActive && (
        <div className="flex items-center gap-1 text-xs text-primary font-medium">
          <ChevronRight className="h-3 w-3" />
          <span>Current</span>
        </div>
      )}
    </div>
  )
}

export function HistoryPanel({ onRefreshTasks }: { onRefreshTasks: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const { 
    history, 
    currentIndex, 
    canUndo, 
    canRedo, 
    isLoading, 
    undo, 
    redo 
  } = useHistory()

  const handleUndo = async () => {
    await undo()
    onRefreshTasks()
  }

  const handleRedo = async () => {
    await redo()
    onRefreshTasks()
  }

  return (
    <>
      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 z-50">
        <div className="flex items-center gap-1 bg-card border border-border rounded-full p-1 shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="h-4 w-4" />
            <span className="sr-only">Redo</span>
          </Button>
          <div className="w-px h-6 bg-border" />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-full",
              isOpen && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => setIsOpen(!isOpen)}
            title="View History"
          >
            <History className="h-4 w-4" />
            <span className="sr-only">View History</span>
          </Button>
        </div>
      </div>

      {/* History Panel Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* History Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-xl z-50 transform transition-transform duration-300 ease-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">History</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {history.length} actions
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 p-4 border-b border-border bg-muted/30">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              <Undo2 className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleRedo}
              disabled={!canRedo}
            >
              <Redo2 className="h-4 w-4 mr-2" />
              Redo
            </Button>
          </div>

          {/* History List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <History className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No history yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your actions will appear here
                  </p>
                </div>
              ) : (
                [...history].reverse().map((entry, idx) => {
                  const actualIndex = history.length - 1 - idx
                  return (
                    <HistoryEntryItem
                      key={entry.id}
                      entry={entry}
                      isActive={actualIndex === currentIndex}
                      isFuture={actualIndex > currentIndex}
                    />
                  )
                })
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          {isLoading && (
            <div className="p-4 border-t border-border bg-muted/30">
              <p className="text-xs text-muted-foreground text-center animate-pulse">
                Processing...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
