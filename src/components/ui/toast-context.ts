import { createContext } from "react";
import type { ToastType } from "./Toast";

export interface PushToastInput {
  type: ToastType;
  title: string;
  message?: string;
}

export interface ToastContextValue {
  pushToast: (toast: PushToastInput) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
