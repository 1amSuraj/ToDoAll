import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
      
        <AuthProvider>
        <Navbar />{children}</AuthProvider>
      </body>
    </html>
  );
}