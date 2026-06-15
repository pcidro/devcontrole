import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({ error: "Not Authorized" }, { status: 401 });
  }
  const { name, email, phone, adress, userId } = await req.json();

  try {
    const createClient = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        adress: adress ? adress : "",
        userId,
      },
    });
    revalidatePath("/dashboard/customer");

    return Response.json({
      message: "Cliente cadastrado com sucesso",
      createClient,
    });
  } catch {
    return Response.json(
      { error: "Failed to create new customer" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json({ error: "Not Authorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Missing customer ID" }, { status: 400 });
  }

  const findTickets = await prisma.ticket.findFirst({
    where: {
      customerId: id,
    },
  });

  if (findTickets) {
    return Response.json(
      { error: "Erro ao deletar usuário - Chamado em aberto" },
      { status: 400 },
    );
  }
  try {
    await prisma.customer.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/customer");
    return Response.json({
      message: "Cliente deletado com sucesso",
    });
  } catch {
    console.log("Erro ao deletar usuário");
  }
}
