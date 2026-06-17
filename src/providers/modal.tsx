"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Ticket } from "@/types/tickets.type";
import { ICustomer } from "@/types/customer.type";
import ModalComponent from "@/components/ui/modal";
interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailTicket: (details: TicketInfo) => void;
}

interface TicketInfo {
  ticket: Ticket;
  customer: ICustomer | null;
}

export const ModalContext = createContext<ModalContextData | null>(null);

export const Modal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useCart deve estar dentro do CartProvider");
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  function handleModalVisible() {
    setVisible(!visible);
  }

  function setDetailTicket(details: TicketInfo) {
    setTicket(details);
  }
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();
  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setDetailTicket }}
    >
      {visible && <ModalComponent />}
      {children}
    </ModalContext.Provider>
  );
};
