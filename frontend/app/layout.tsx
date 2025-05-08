import "./globals.css"
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout ({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
         <body>
          <div>
            <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                <Link href="/">Home</Link> | <Link href="/lines">Lines</Link>
            </nav>
            <main style={{ padding: "20px" }}>{children}</main>
          </div>
         </body>
        </html>
    );
}
