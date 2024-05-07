import { Modal } from "@/components/Modal";
import type { FC, PropsWithChildren } from "react";

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Modal />
      {children}
    </>
  );
};
