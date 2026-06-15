import Container from "@/components/layout/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Ticketitem from "./components/ticketitem";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3-xl font-bold">Chamados</h1>
          <Link
            className="bg-blue-500 px-4 py-1 rounded text-white"
            href="/dashboard/new"
          >
            Abrir Chamado
          </Link>
        </div>
        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left"> DATA CADASTRO</th>
              <th className="font-medium text-left"> STATUS</th>
              <th className="font-medium text-left"> #</th>
            </tr>
          </thead>
          <tbody>
            <Ticketitem />
          </tbody>
        </table>
      </main>
    </Container>
  );
}
