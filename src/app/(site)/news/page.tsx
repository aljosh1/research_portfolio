import type { Metadata } from "next";
import { Paragraphs } from "@/components/paragraphs";
import { listNews } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "News", description: "Announcements and updates." };

export default async function NewsPage() {
  const news = await listNews();
  return (
    <section className="section">
      <div className="narrow">
        <div className="section-head"><div><span className="eyebrow">Updates</span><h2>News</h2></div></div>
        {news.length ? (
          news.map((n) => (
            <article key={n.id} id={n.id} className="message-card">
              <div className="card-meta">{formatDate(n.date)}</div>
              <h3 style={{ fontSize: 22, color: "var(--navy)", marginBottom: 8 }}>{n.title}</h3>
              <p>{n.summary}</p>
              <Paragraphs text={n.body} />
            </article>
          ))
        ) : (
          <p className="empty">No news yet.</p>
        )}
      </div>
    </section>
  );
}