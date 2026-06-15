import Container from "@/components/layout/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import CustomerForm from "../components/CustomerForm";

export default async function NewClient() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            className="bg-gray-900 px-4 py-1 text-white rounded hover:font-bold duration-300"
            href="/dashboard/customer"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo Cliente</h1>
        </div>
        <CustomerForm />
      </main>
    </Container>
  );
}
