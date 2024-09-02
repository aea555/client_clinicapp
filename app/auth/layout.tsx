import "../../styles/globals.css"

export interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return <div className="min-h-screen">
    {children}
    </div>;
}
