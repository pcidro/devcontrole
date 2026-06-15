"use client";
import { api } from "@/lib/api";
import { ICustomer } from "@/types/customer.type";
import { useRouter } from "next/navigation";

interface ClientCardProps {
  customers: ICustomer[];
}

export default function ClientCard({ customers }: ClientCardProps) {
  const router = useRouter();

  async function handleDelete(idDelete: string) {
    try {
      const res = await api.delete("/api/customer", {
        params: {
          id: idDelete,
        },
      });

      router.refresh();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {customers.map((customer) => (
        <div
          key={customer.id}
          className="flex flex-col bg-gray-100  p-2 rounded-lg gap-2 hover:scale-105 duration-300  "
        >
          <h2>
            <span className="font-bold">Nome:</span>
            {customer.name}
          </h2>
          <p>
            <span className="font-bold">Email:</span> {customer.email}
          </p>
          <p>
            <span className="font-bold">Telefone:</span> {customer.phone}
          </p>
          <p>
            {customer.adress && (
              <>
                <span className="font-bold">Endereço:</span>
                {customer.adress}
              </>
            )}
          </p>
          <button
            onClick={() => handleDelete(customer.id)}
            className="bg-red-500 px-4 rounded mt-2 self-start"
          >
            Deletar
          </button>
        </div>
      ))}
    </>
  );
}
