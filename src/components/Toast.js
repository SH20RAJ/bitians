"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

const ToastContext = createContext();

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, type = "default", duration = 5000 }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast = { id, title, description, type, duration };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((props) => addToast(props), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    default: Info,
  };

  const Icon = icons[toast.type] || icons.default;

  const typeStyles = {
    success: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
    error: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
    default: "bg-background border-border",
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-sm items-center space-x-4 rounded-md border p-4 shadow-lg glass animate-in slide-in-from-top-2",
        typeStyles[toast.type]
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1 space-y-1">
        {toast.title && (
          <h4 className="text-sm font-semibold">{toast.title}</h4>
        )}
        {toast.description && (
          <p className="text-sm opacity-90">{toast.description}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
