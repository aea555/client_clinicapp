import { LayoutProps } from "app/auth/layout";
import AppHeader from "components/partials/AppHeader";
import React from "react";

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      {children}
    </div>
  );
}
