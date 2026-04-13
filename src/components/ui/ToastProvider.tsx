import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ToastContext, type PushToastInput } from "./toast-context";
import { Toast, type ToastItem } from "./Toast";

interface ToastProviderProps {
  children: ReactNode;
}

const TOAST_DURATION_MS = 3600;

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback((toast: PushToastInput) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((current) => [...current, { id, ...toast }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) {
      return undefined;
    }

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        removeToast(toast.id);
      }, TOAST_DURATION_MS),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [removeToast, toasts]);

  const contextValue = useMemo(
    () => ({
      pushToast,
    }),
    [pushToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
