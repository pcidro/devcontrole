import { ReactNode } from "react";
import DashboardHeader from "./components/dashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
