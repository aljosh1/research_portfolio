"use client";

import { BookOpen, Clock, FlaskConical, LayoutDashboard, Mail, Newspaper, UserCircle, Users, KeyRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/profile", label: "Profile", icon: UserCircle },
  { href: "/admin/publications", label: "Publications", icon: BookOpen },
  { href: "/admin/projects", label: "Research projects", icon: FlaskConical },
  { href: "/admin/timeline", label: "Education & career", icon: Clock },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/messages", label: "Messages", icon: Mail, badge: true },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/admin/account", label: "My password", icon: KeyRound },
];

export function AdminNav({ unread, isAdmin }: { unread: number; isAdmin: boolean }) {
  const pathname = usePathname();
  return (
    <nav className="admin-nav" aria-label="Admin">
      {items
        .filter((i) => !i.adminOnly || isAdmin)
        .map(({ href, label, icon: Icon, exact, badge }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined}>
              <Icon size={17} aria-hidden /> {label}
              {badge && unread > 0 && <span className="nav-count" aria-label={`${unread} unread`}>{unread}</span>}
            </Link>
          );
        })}
    </nav>
  );
}