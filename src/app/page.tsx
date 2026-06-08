import Image from "next/image";

export default async function AppPage() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <span className="font-medium text-2xl mb-2">Gerencie sua empresa</span>
      <h1 className="font-bold text-3xl mb-8 text-blue-500 md:text-4xl">
        Atendimentos e clientes
      </h1>
      <Image
        src="../assets/hero.svg"
        alt="Imagem hero"
        width={600}
        height={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
