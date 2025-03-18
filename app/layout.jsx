import { ReactNode } from "react";
import "../global.css"; // Ensure you have Tailwind styles imported

export const metadata = {
  title: "My App",
  description: "A modern web application",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
     

          {/* Main Content */}
          <main className="flex-grow container mx-auto p-4">{children}</main>

          {/* Footer */}
          
        </div>
      </body>
    </html>
  );
}
