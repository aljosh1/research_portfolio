import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { getSession } from "@/lib/auth";

export const metadata = { title: "Sign in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  return (
    <div className="login-wrap">
      <main id="main" className="login-card">
        <h1 style={{ fontSize: 28, color: "var(--navy)", marginBottom: 6 }}>Admin sign in</h1>
        <p className="muted">Sign in to manage your website content.</p>
        <LoginForm />
      </main>
    </div>
  );
}