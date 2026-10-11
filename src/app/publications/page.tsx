"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile, publications } from "@/data/portfolio";

export default function PublicationsPage() {
  const types = ["All", ...new Set(publications.map((item) => item.type))];
  const [selectedType, setSelectedType] = useState("All");

  const filtered = useMemo(
    () =>
      publications.filter(
        (item) => selectedType === "All" || item.type === selectedType,
      ),
    [selectedType],
  );

  return (
    <main className="detail-page section-shell" style={{ paddingBottom: 88 }}>
      <div className="detail-topbar" style={{ marginTop: 28 }}>
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to homepage
        </Link>
        <span>PUBLICATIONS</span>
      </div>

      <section className="detail-hero" style={{ paddingTop: 32 }}>
        <p className="eyebrow">SCHOLARLY OUTPUT</p>
        <h1>
          Publications and selected work
          <span className="accent-dot">.</span>
        </h1>
        <p>
          Searchable records of peer-reviewed, invited, and collaborative research outputs, with filters for type and publication status.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={selectedType === type ? "button button-dark" : "button button-text"}
              style={{ padding: "10px 14px", fontSize: 12 }}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <div className="project-grid" style={{ marginTop: 32 }}>
        {filtered.map((publication) => (
          <article className="project-card" key={publication.title}>
            <div className="project-artwork artwork-lavender" style={{ aspectRatio: "1.22" }}>
              <div className="art-window" style={{ width: "76%", height: "70%" }}>
                <div className="art-main">
                  <div className="art-topbar">
                    <span className="art-breadcrumb">{publication.type}</span>
                    <span className="art-topbar-icons">
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                  <div className="art-dashboard">
                    <span className="art-eyebrow">{publication.year}</span>
                    <span className="art-title">{publication.title}</span>
                    <span className="art-subtitle">{publication.venue}</span>
                  </div>
                </div>
              </div>
              <span className="art-label">{publication.status}</span>
            </div>
            <div className="project-meta">
              <span>{publication.year}</span>
              <span>{publication.type}</span>
            </div>
            <div className="project-title-row">
              <h3>{publication.title}</h3>
            </div>
            <p>{publication.abstract}</p>
            <p style={{ color: "var(--muted)" }}>
              {publication.authors.join(", ")}
            </p>
          </article>
        ))}
      </div>

      <footer className="detail-footer" style={{ marginTop: 42 }}>
        <Link href="/research">
          <ArrowLeft size={15} /> Research projects
        </Link>
        <Link href={`mailto:${profile.email}`}>
          Contact the lecturer <ArrowUpRight size={15} />
        </Link>
      </footer>
    </main>
  );
}
