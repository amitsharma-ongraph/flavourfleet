import type { ReactNode } from "react";

export interface Notification {
  type: "error" | "success";
  title: string;
  description?: ReactNode;
  path?: string;
  pathAs?: string;
  link?:string
}
