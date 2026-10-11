import type { Project } from "@/data/portfolio";
import Image from "next/image";

/*{export function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div
      className={`project-artwork artwork-${project.theme}`}
      aria-hidden="true"
    >
      <div className="art-window">
        <div className="art-sidebar">
          <span className="art-logo" />
          <span className="art-sidebar-line is-selected" />
          <span className="art-sidebar-line" />
          <span className="art-sidebar-line" />
          <span className="art-avatar" />
        </div>
        <div className="art-main">
          <div className="art-topbar">
            <span className="art-breadcrumb">{project.name}</span>
            <span className="art-topbar-icons">
              <Search size={12} />
              <CircleHelp size={12} />
            </span>
          </div>
          {project.slug === "atlas" ? (
            <div className="art-dashboard">
              <span className="art-eyebrow">MONDAY, 9:41 AM</span>
              <span className="art-title">Good morning, Alex</span>
              <span className="art-subtitle">
                Here&apos;s what&apos;s happening this week.
              </span>
              <div className="art-metrics">
                <span>
                  <i>In progress</i>
                  <b>08</b>
                </span>
                <span>
                  <i>Completed</i>
                  <b>24</b>
                </span>
              </div>
              <span className="art-list-row">
                <Check size={11} /> Launch planning <i>Today</i>
              </span>
              <span className="art-list-row">
                <span className="art-dot" /> Design review <i>Tomorrow</i>
              </span>
            </div>
          ) : project.slug === "fieldnotes" ? (
            <div className="art-dashboard art-data">
              <span className="art-eyebrow">YOUR CITY · 2024</span>
              <span className="art-title">A changing climate</span>
              <span className="art-subtitle">
                A closer look at the places we call home.
              </span>
              <div className="art-chart">
                {[34, 43, 39, 57, 50, 69, 63, 84, 73, 94, 77, 100].map(
                  (height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
              <span className="art-chart-label">
                <i>2014</i>
                <i>2019</i>
                <i>2024</i>
              </span>
            </div>
          ) : (
            <div className="art-dashboard art-shop">
              <span className="art-eyebrow">OBJECTS WITH A STORY</span>
              <span className="art-title">Made for keeping.</span>
              <div className="art-product">
                <span className="art-product-shape">
                  <Layers3 size={38} strokeWidth={1} />
                </span>
                <span>
                  <i>THE EVERYDAY VESSEL</i>
                  <b>$48.00</b>
                </span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="art-label">{project.number} / 03</span>
    </div>
  );
} */



export function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className={`project-artwork artwork-${project.theme}`}>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 767px) 100vw, 33vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}