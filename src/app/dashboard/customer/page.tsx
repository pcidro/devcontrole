import Container from "@/components/layout/Container";
import Link from "next/link";
import ClientCard from "./components/clientCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
export default async function CustomerPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold self-center ">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Novo Cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <ClientCard customers={customers} />
        </section>
        {customers.length === 0 && (
          <h1 className="text-gray-600">
            Você ainda não possui nenhum cliente.
          </h1>
        )}
      </main>
    </Container>
  );
}
