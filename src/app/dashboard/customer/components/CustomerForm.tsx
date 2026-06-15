"use client";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { PatternFormat } from "react-number-format";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.email("Digite um email correto").min(1),
  telefone: z.string().refine(
    (value) => {
      const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
      return regex.test(value);
    },
    {
      message: "O número de telefone está incorreto.(DD) 99999-9999 ",
    },
  ),
  adress: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function CustomerForm({ userId }: { userId: string }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.telefone,
      email: data.email,
      userId: userId,
      adress: data.adress,
    });
    router.replace("/dashboard/customer");
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterCustomer)}
      className="flex flex-col mt-6"
    >
      <label className="mb-1 text-lg font-medium">Nome Completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />
      <section className="flex gap-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <PatternFormat
                value={field.value}
                onValueChange={(values) => {
                  field.onChange(values.formattedValue);
                }}
                format="(##) #####-####"
                mask="_"
                placeholder="Digite o telefone completo"
                className="border w-full h-11 rounded px-2"
              />
            )}
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm">{errors.telefone.message}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="text"
            name="email"
            placeholder="Digite o email completo"
            error={errors.email?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Endereço Completo</label>
          <Input
            type="text"
            name="adress"
            placeholder="Digite o endereço completo"
            error={errors.adress?.message}
            register={register}
          />
        </div>
      </section>
      <button
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold cursor-pointer"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}
