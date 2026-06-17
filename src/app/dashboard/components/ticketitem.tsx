"use client";
import { ICustomer } from "@/types/customer.type";
import { Ticket } from "@/types/tickets.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Modal } from "@/providers/modal";
interface TicketItemProps {
  ticket: Ticket;
  customer: ICustomer | null;
}

export default function Ticketitem({ customer, ticket }: TicketItemProps) {
  const { handleModalVisible, setDetailTicket } = Modal();
  const router = useRouter();
  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer,
      ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-slate-200 duration-200">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>

        <td>
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button onClick={handleChangeStatus} className="mr-2 cursor-pointer">
            <FiCheckSquare size={24} color="green" />
          </button>
          <button onClick={handleOpenModal} className="cursor-pointer">
            <FiFile size={24} color="#3b72f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
