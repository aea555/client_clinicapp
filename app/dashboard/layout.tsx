import { LayoutProps } from "app/auth/layout";
import DashboardHeader from "components/partials/DashboardHeader";
import React from "react";

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      {children}
    </div>
  );
}
