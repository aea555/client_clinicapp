import { LayoutProps } from "app/auth/layout";

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}