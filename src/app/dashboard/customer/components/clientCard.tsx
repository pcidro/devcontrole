export default async function ClientCard() {
  return (
    <div className="flex flex-col bg-gray-100  p-2 rounded-lg gap-2 hover:scale-105 duration-300  ">
      <h2>
        <span className="font-bold">Nome:</span>André Silva
      </h2>
      <p>
        <span className="font-bold">Email:</span> Teste@teste.com
      </p>
      <p>
        <span className="font-bold">Telefone:</span> 9999-9999
      </p>
      <button className="bg-red-500 px-4 rounded mt-2 self-start">
        Deletar
      </button>
    </div>
  );
}
