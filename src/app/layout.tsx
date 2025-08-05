import Navbar from "./components/navbar";
import "../app/globals.css";

export const metadata = {
  title: "To-Do App",
  description: "CRUD with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
