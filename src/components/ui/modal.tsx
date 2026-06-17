"use client";
import { Modal } from "@/providers/modal";
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
export default function ModalComponent() {
  const { handleModalVisible, ticket } = Modal();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };
  return (
    <section
      onClick={handleModalClick}
      className="absolute bg-gray-900/80 w-full min-h-screen"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-xl p-3 rounded"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do chamado:
            </h1>
            <button onClick={handleModalVisible} className="cursor-pointer">
              <FaTimes color="red" />
            </button>
          </div>
          <div className="flex gap-1 flex-wrap">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticket?.ticket.name}</p>
          </div>
          <div className="flex flex-col gap-1 flex-wrap">
            <h2 className="font-bold">Descrição:</h2>
            <p>{ticket?.ticket.description}</p>
          </div>
          <div className="w-full border-b my-4"></div>
          <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>
          <div className="flex gap-1 flex-wrap">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticket?.customer?.name}</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            <h2 className="font-bold">Telefone:</h2>
            <p>{ticket?.customer?.phone}</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            <h2 className="font-bold">Email:</h2>
            <p>teste@teste</p>
          </div>
          {ticket?.customer?.adress && (
            <div className="flex gap-1 flex-wrap">
              <h2 className="font-bold">Endereço:</h2>
              <p>{ticket?.customer?.adress}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
