import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProfile } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  return (
    <>
      <SiteHeader name={profile.fullName} />
      <main id="main">{children}</main>
      <SiteFooter profile={profile} />
    </>
  );
}