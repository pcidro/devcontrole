import Container from "@/components/layout/Container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewChamadoPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });
    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link className="text-white px-4 py-1 bg-gray-900" href="/dashboard">
            Voltar
          </Link>

          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        {customers.length === 0 ? (
          <div className="mt-6 flex flex-col gap-2">
            <p className="text-lg">
              Você ainda não possui nenhum cliente cadastrado.
            </p>

            <Link
              href="/dashboard/customer/new"
              className="bg-blue-500 text-white px-4 py-2 rounded self-start"
            >
              Cadastrar cliente
            </Link>
          </div>
        ) : (
          <form action={handleRegisterTicket} className="flex flex-col mt-6">
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>

            <input
              className="w-full border-2 rounded-md px-2 mb-2 h-11"
              type="text"
              placeholder="Digite o nome do chamado"
              required
              name="name"
            />

            <label className="mb-1 font-medium text-lg">
              Descreva o problema
            </label>

            <textarea
              className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
              placeholder="Descreva o problema..."
              name="description"
              required
            />

            <label className="mb-1 font-medium text-lg">
              Selecione o cliente
            </label>

            <select
              name="customer"
              className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={customers.length === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-400"
            >
              Abrir chamado
            </button>
          </form>
        )}
      </main>
    </Container>
  );
}
