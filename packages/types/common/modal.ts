import type { ReactNode, FunctionComponent } from "react";
import { Notification } from "./Notification";

interface ModalAction {
  text: string;
  loadingText?: string;
  fn?: () => Promise<Notification | void>;
}

export interface Modal {
  size?: "sm" | "md" | "lg";
  cover?: ReactNode;
  title: string;
  description?: ReactNode;
  ModalBody?: FunctionComponent<any>;
  onSubmit?: (data: any) => Promise<Notification | void>;
  secondaryActionCancel?: boolean;
  secondaryAction?: ModalAction;
  primaryAction?: ModalAction;
  imbueShowState?: boolean;
}
