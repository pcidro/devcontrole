"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleLogin() {
    setIsLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="fixed inset-0 z-20 flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_48%,#ffffff_100%)] px-5 py-8 font-(family-name:--font-inter) text-slate-950 sm:px-8">
      <section className="grid w-full max-w-6xl animate-[login-enter_650ms_ease-out] items-center gap-12 md:grid-cols-[1.12fr_0.88fr]">
        <div className="text-center md:text-left">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl md:mx-0 lg:text-6xl">
            Bem-vindo ao <span className="text-blue-600">Dev Controle</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:mx-0">
            Gerencie seus projetos, tarefas e produtividade em um único lugar.
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm md:mx-0 md:justify-self-end">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/25 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:bg-blue-600"
          >
            {isLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <FcGoogle className="h-5 w-5 rounded-full bg-white" />
            )}
            <span>{isLoading ? "Conectando..." : "Entrar com Google"}</span>
          </button>

          <p className="mt-5 text-center text-xs leading-6 text-slate-500">
            Ao continuar, você concorda com nossos termos de uso e política de
            privacidade.
          </p>
        </div>
      </section>
    </main>
  );
}
