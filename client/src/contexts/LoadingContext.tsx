import { createContext, useContext, useState, ReactNode, useRef, useCallback } from "react";

interface LoadingOperation {
  id: string;
  message: string;
  priority: number; // Higher priority messages take precedence
}

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  showLoading: (message?: string, priority?: number) => () => void;
  hideLoading: (id: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Priority levels
export const LOADING_PRIORITY = {
  BACKGROUND: 0,  // React Query automatic loading
  NORMAL: 10,     // Default manual operations
  HIGH: 20,       // Critical user-facing operations
};

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [operations, setOperations] = useState<LoadingOperation[]>([]);
  const nextIdRef = useRef(0);

  const showLoading = useCallback((message: string = "Carregando...", priority: number = LOADING_PRIORITY.NORMAL) => {
    const id = `loading-${nextIdRef.current++}`;
    setOperations(prev => [...prev, { id, message, priority }]);
    
    // Return cleanup function
    return () => {
      setOperations(prev => prev.filter(op => op.id !== id));
    };
  }, []);

  const hideLoading = useCallback((id: string) => {
    setOperations(prev => prev.filter(op => op.id !== id));
  }, []);

  // Derive loading state from operations
  const isLoading = operations.length > 0;
  
  // Show message from highest priority operation
  const highestPriorityOp = operations.reduce<LoadingOperation | null>((highest, op) => {
    if (!highest || op.priority > highest.priority) {
      return op;
    }
    return highest;
  }, null);
  
  const loadingMessage = highestPriorityOp?.message || "Carregando...";

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
