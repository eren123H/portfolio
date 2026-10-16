import {
  ArrowUpRight,
  Download,
  FileText,
  Folder,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { apps, type AppId } from "../data/apps";
import { experiences, profile, projects, skillGroups } from "../data/portfolio";
import { TerminalApp } from "./terminal/TerminalApp";
import "./PortfolioContent.css";

function ProfileLinks() {
  return (
    <nav className="profile-links" aria-label="Eren’in iletişim bağlantıları">
      {profile.links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
          <ArrowUpRight size={13} />
        </a>
      ))}
    </nav>
  );
}

export function AppContent({
  id,
  onOpen,
}: {
  id: AppId;
  onOpen: (id: AppId) => void;
}) {
  if (id === "terminal") return <TerminalApp />;
  if (id === "finder")
    return (
      <div className="finder-layout">
        <aside className="finder-sidebar">
          <span>ÇALIŞMA ALANI</span>
          <p>
            <Folder size={15} /> Portfolyo
          </p>
          <small>{profile.name}</small>
        </aside>
        <div className="finder-grid">
          {apps
            .filter((app) => !["finder", "settings"].includes(app.id))
            .map((app) => (
              <button
                className="finder-app"
                key={app.id}
                onClick={() => onOpen(app.id)}
              >
                <span className={`app-icon app-icon-${app.color}`}>
                  <app.icon />
                </span>
                <span>{app.name}</span>
                <ArrowUpRight size={13} />
              </button>
            ))}
        </div>
      </div>
    );
  if (id === "projects")
    return (
      <div className="app-page portfolio-projects">
        <span className="section-label">
          SEÇİLİ PROJELER / {projects.length} ÇALIŞMA
        </span>
        <h2>İşin ihtiyacından teknik çözüme.</h2>
        <p>
          Kurumsal destek süreçlerinden veri analizine, üzerinde çalıştığım
          problemler ve çözümler.
        </p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.id}>
              <a
                className="project-screenshot"
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub reposunu incele`}
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="360"
                />
                <span>
                  {project.imageCaption}
                  <ArrowUpRight size={12} />
                </span>
              </a>
              <div className="project-card-copy">
                <span className="project-category">
                  {String(index + 1).padStart(2, "0")} / {project.category}
                </span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul
                  className="technology-tags"
                  aria-label={`${project.title} teknolojileri`}
                >
                  {project.technologies.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a
                  className="portfolio-text-link"
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub’da incele
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  if (id === "about")
    return (
      <div className="app-page portfolio-about">
        <span className="section-label">
          HAKKIMDA / {profile.name.toLocaleUpperCase("tr-TR")}
        </span>
        <h2>Teknolojinin iş tarafını da merak ediyorum.</h2>
        <p>{profile.summary}</p>
        <div className="profile-location">
          <MapPin size={14} />
          {profile.location}
          <span>·</span>
          {profile.language}
        </div>
        <ProfileLinks />
        <section className="education-card" aria-labelledby="education-title">
          <GraduationCap size={23} />
          <div>
            <h3 id="education-title">{profile.education.university}</h3>
            <p>{profile.education.degree}</p>
            <small>{profile.education.years}</small>
          </div>
        </section>
        <section
          className="experience-section"
          aria-labelledby="experience-title"
        >
          <h3 id="experience-title">Deneyim</h3>
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.company}>
              <div className="experience-heading">
                <h4>{experience.company}</h4>
                <span>{experience.year}</span>
              </div>
              <p className="experience-role">{experience.role}</p>
              <ul>
                {experience.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    );
  if (id === "skills")
    return (
      <div className="app-page portfolio-skills">
        <span className="section-label">YETENEKLER / ARAÇ KUTUSU</span>
        <h2>Projelerde kullandığım araçlar.</h2>
        <p>
          Yazılım, veri ve iş süreçlerini bir araya getiren çalışma alanlarım.
        </p>
        <div className="skill-categories">
          {skillGroups.map((group, index) => (
            <section className="skill-category" key={group.title}>
              <span className="section-label">0{index + 1}</span>
              <h3>{group.title}</h3>
              <ul className="technology-tags" aria-label={group.title}>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <p>{group.evidence}</p>
            </section>
          ))}
        </div>
        <p className="language-note">Dil: {profile.language}</p>
      </div>
    );
  if (id === "resume")
    return (
      <div className="app-page portfolio-resume">
        <div className="resume-copy">
          <span className="section-label">ÖZGEÇMİŞ / PDF</span>
          <h2>Tek sayfada hikâyem.</h2>
          <p>
            {profile.name}
            <br />
            {profile.focusAreas.join(" · ")}
          </p>
          <p>Eğitimim, staj deneyimlerim, projelerim ve teknik becerilerim.</p>
          <div className="resume-actions">
            <a
              className="primary-button"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={16} />
              CV’yi Görüntüle
              <ArrowUpRight size={14} />
            </a>
            <a
              className="secondary-button"
              href={profile.resume}
              download="Eren_Ucar_CV.pdf"
            >
              <Download size={16} />
              CV’yi İndir
            </a>
          </div>
          <span className="resume-file-note">Türkçe · PDF · 1 sayfa</span>
          <ProfileLinks />
        </div>
        <a
          className="resume-preview"
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Eren Uçar özgeçmişini PDF olarak görüntüle"
        >
          <img
            src={profile.resumePreview}
            alt="Eren Uçar’ın tek sayfalık Türkçe özgeçmişi"
            width="560"
            height="792"
            loading="lazy"
          />
          <span>
            PDF’yi aç
            <ArrowUpRight size={13} />
          </span>
        </a>
      </div>
    );
  return (
    <div className="app-page">
      <span className="section-label">ÇALIŞMA ALANIN / ÖNİZLEME</span>
      <h2>Kendine göre bir çalışma alanı.</h2>
      <p>Görünüm tercihleri sonraki aşamalarda eklenecek.</p>
      <div className="settings-row">
        <div>
          <strong>Görünüm</strong>
          <p>Aydınlık cam · Mavi ve mor</p>
        </div>
        <span className="appearance-swatch" aria-hidden="true" />
      </div>
      <div className="settings-row">
        <div>
          <strong>Hareket</strong>
          <p>Cihazının azaltılmış hareket tercihini izler.</p>
        </div>
        <span className="placeholder-tag">SİSTEM</span>
      </div>
    </div>
  );
}
