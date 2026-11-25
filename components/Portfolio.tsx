"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUp, ArrowUpRight, Braces, Check, ChevronDown, Code2, Database, Github, GraduationCap, Linkedin, MapPin, Maximize2, Menu, Moon, PanelTop, Play, ShieldCheck, Sun, Terminal, Trophy, Wallet, Workflow, X } from "lucide-react";
import content from "./content.json";
const imageRoot = (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/images";

type Language = "en" | "id";
type Theme = "dark" | "light";
type Filter = "all" | "personal" | "professional";
type Key = keyof typeof content.projects;
type Project = { title: string; titleId?: string; personal: boolean; role?: Record<Language, string>; link?: string; tags: string[]; en: {desc:string;points:string[];note:string}; id: {desc:string;points:string[];note:string} };
const projects: Record<Key,Project> = content.projects;
const ids: Key[] = ["catatin","lagakami","bank","cap","health","cmw","clientPortal"];
const socials = { linkedin: "https://www.linkedin.com/in/rizki-sundara-582b28258/", github: "https://github.com/rizkisundara" };
const nav = [["work","Work","Proyek"],["experience","Experience","Pengalaman"],["about","About","Tentang"],["skills","Toolkit","Keahlian"],["contact","Contact","Kontak"]] as const;
const jobData = [
  { date:"Feb 2026 — Present", dateId:"Feb 2026 — Sekarang", name:"BNI", role:"Application Developer Jr.", label:"Project placement", labelId:"Penempatan proyek", desc:["bni1","bni2","bni3"], stack:["C#","ASP.NET Core","SQL Server","UiPath"] },
  { date:"Nov 2025 — Jan 2026", dateId:"Nov 2025 — Jan 2026", name:"PT IForce", role:"Full Stack Developer", label:"Trakindo project", labelId:"Proyek Trakindo", desc:["iforce1","iforce2"], stack:["REST API","SQL Server","System integration"] },
  { date:"Apr 2024 — Nov 2025", dateId:"Apr 2024 — Nov 2025", name:"PT Syntech Mitra Integrasi", role:"Full Stack .NET Developer", label:"Healthcare & insurance", labelId:"Kesehatan & asuransi", desc:["syn1","syn2","syn3"], stack:[".NET Core","Golang","SQL Server","Docker"] },
  { date:"Oct 2023 — Jan 2024", dateId:"Okt 2023 — Jan 2024", name:"PT XSIS Mitra Utama", role:".NET Developer Trainee", label:"Professional training", labelId:"Pelatihan profesional", desc:["xsis1","xsis2"], stack:["C#","SQL","JavaScript"] },
];
const groups = [
  {icon:Braces, title:"Backend engineering", id:"Pengembangan backend", tags:["C#","ASP.NET Core","Golang","Go Fiber","REST API"]},
  {icon:PanelTop, title:"Frontend development",id:"Pengembangan frontend",tags:["React","Next.js","TypeScript","JavaScript","Tailwind CSS","Razor","jQuery"]},
  {icon:Database,title:"Data & persistence",id:"Data & basis data",tags:["SQL Server","PostgreSQL","Supabase","EF Core","Dapper","Prisma"]},
  {icon:Workflow,title:"Integration & automation",id:"Integrasi & otomasi",tags:["API Integration","UiPath Orchestrator","RPA","JWT"]},
  {icon:Terminal,title:"Delivery & tooling",id:"Rilis & perangkat kerja",tags:["Docker","IIS","Vercel","Git","Bitbucket","Jira"]},
  {icon:ShieldCheck,title:"Quality & documentation",id:"Pengujian & dokumentasi",tags:["Unit Testing","SIT","UAT","Vitest","Playwright","FSD / TSD"]},
];
function getSetting(k:string) { try { return localStorage.getItem(k); } catch { return null; } }
function setSetting(k:string,v:string) { try { localStorage.setItem(k,v); } catch {} }
function text(key:string, lang:Language) { const d = (lang === "id" ? content.translations : content.english) as Record<string,string>; return (d[key] || key).replaceAll("&amp;","&").replace(/<[^>]+>/g," "); }
function Tags({tags}:{tags:string[]}) {return <div className="tags">{tags.map(tag=><span key={tag}>{tag}</span>)}</div>}
function External({href,children,className=""}:{href:string;children:ReactNode;className?:string}) {return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true"/></a>}
function SectionHeading({number,eyebrow,title,description}:{number:string;eyebrow:string;title:string;description:string}) {return <div className="section-heading"><div><div className="eyebrow"><span>{number}</span><span className="small-rule"/>{eyebrow}</div><h2>{title}</h2></div><p>{description}</p></div>}
function ProjectArt({id,lang}:{id:Key;lang:Language}) {
  const t=(en:string,indo:string)=>lang==="id"?indo:en;
  if(id==="catatin") return <div className="product-art finance"><span className="visual-label">{t("Product concept","Konsep produk")}</span><div className="mock-window"><div className="mock-top"><span className="mock-logo"><Wallet size={15}/> catatin.</span><span className="mock-indicator"><i/> {t("Overview","Ringkasan")}</span></div><div className="finance-grid"><div className="balance"><small>{t("My wallets","Dompet saya")}</small><strong>Rp ••••••</strong><div className="spark"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div className="mock-summary"><div><span className="tiny-dot"/>{t("Income","Pemasukan")}</div><div><span className="tiny-dot expense"/>{t("Expenses","Pengeluaran")}</div><div className="mini-ring"/></div></div><div className="mock-row"><span className="mini-square"/><div><b>{t("Transactions","Transaksi")}</b><small>{t("History & categories","Riwayat & kategori")}</small></div><span className="row-arrow">↗</span></div></div></div>;
  if(id==="lagakami") return <div className="product-art sport"><span className="visual-label">{t("Product concept","Konsep produk")}</span><div className="mock-window"><div className="mock-top"><span className="mock-logo"><Trophy size={16}/> LAGAKAMI</span><span className="mock-indicator"><i/> {t("Bracket","Bagan")}</span></div><div className="bracket"><div className="bracket-col">{["A","B","C","D"].map(team=><span key={team}>{t("Team","Tim")} {team}</span>)}</div><div className="bracket-col next"><span>{t("Winner","Pemenang")}</span><span>{t("Winner","Pemenang")}</span></div><div className="bracket-col final"><span><Trophy size={16}/>{t("Final","Final")}</span></div></div><div className="mock-row"><span className="mini-square purple"/><div><b>{t("Match management","Kelola pertandingan")}</b><small>{t("Schedule · Results","Jadwal · Hasil")}</small></div><span className="row-arrow">↗</span></div></div></div>;
  const nodes = id === "clientPortal"
    ? [t("Member","Peserta"), t("Check benefits","Cek manfaat"), t("Register visit","Daftar berobat")]
    : id==="bank"?[t("Request","Permintaan"),t("Approval","Persetujuan"),t("Automation","Otomasi")]:id==="cap"?[t("Applications","Aplikasi"),t("Approval hub","Pusat persetujuan"),t("Review","Tinjau")] :id==="health"?[t("Policy","Polis"),t("Claim","Klaim"),t("Payment","Pembayaran")]:[t("Admission","Pasien masuk"),t("Assessment","Asesmen"),t("Discharge","Pasien keluar")];
  return <div className={`enterprise-art ${id}`}><span className="visual-label">{t("Illustrative workflow","Ilustrasi alur")}</span><div className="workflow-visual">{nodes.map((node,i)=><div key={node} className="workflow-node"><span>{i===0?<PanelTop size={17}/>:i===1?<Workflow size={17}/>:<Check size={17}/>}</span><small>{node}</small>{i<2&&<i/>}</div>)}</div></div>;
}
function outside(e:MouseEvent<HTMLDialogElement>) { if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close();} }

export default function Portfolio(){
  const [lang,setLang]=useState<Language>("en");
  const [theme,setTheme]=useState<Theme>("dark");
  const [filter,setFilter]=useState<Filter>("all");
  const [active,setActive]=useState<Key|null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLDialogElement>(null);
  const [photo,setPhoto]=useState<"portrait"|"aws-photo"|null>(null);
  const [menu,setMenu]=useState(false);
  const [section,setSection]=useState("");
  const [progress,setProgress]=useState(0);
  const [openJob,setOpenJob]=useState<number|null>(0);
  const detailsRef=useRef<HTMLDialogElement>(null);
  const photoRef=useRef<HTMLDialogElement>(null);
  const reduced=useReducedMotion();
  const t=(en:string,id:string)=>lang==="id"?id:en;
  const title=(p:Project)=>lang==="id"&&p.titleId?p.titleId:p.title;
  const project=active?projects[active]:null;
  const visibleIds = ids.filter(id => filter === "all" || (filter === "personal") === projects[id].personal);
  function stepProject(direction: number) {
    if (!active) return;
    const index = visibleIds.indexOf(active);
    setActive(visibleIds[(index + direction + visibleIds.length) % visibleIds.length]);
    detailsRef.current?.scrollTo({ top: 0 });
  }
  useEffect(()=>{setLang(getSetting("rs-lang")==="id"?"id":"en");setTheme(getSetting("rs-theme")==="light"?"light":"dark");},[]);
  useEffect(()=>{document.documentElement.lang=lang;},[lang]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;},[theme]);
  useEffect(()=>{let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?Math.max(0,Math.min(100,window.scrollY/max*100)):0);let current="";for(const [id] of nav){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<160)current=id;}setSection(current);if(window.innerWidth>900)setMenu(false);});};update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};},[]);
  useEffect(()=>{if(active&&!detailsRef.current?.open)detailsRef.current?.showModal();else if(!active&&detailsRef.current?.open)detailsRef.current.close();},[active]);
  useEffect(()=>{if(photo&&!photoRef.current?.open)photoRef.current?.showModal();else if(!photo&&photoRef.current?.open)photoRef.current.close();},[photo]);
  useEffect(()=>{document.body.style.overflow=active||photo||videoOpen?"hidden":"";return()=>{document.body.style.overflow="";};},[active,photo,videoOpen]);
  function toggleLang(){const v=lang==="en"?"id":"en";setLang(v);setSetting("rs-lang",v);}
  function toggleTheme(){const v=theme==="dark"?"light":"dark";setTheme(v);setSetting("rs-theme",v);}
  return <>
    <a className="skip-link" href="#main">{t("Skip to content","Lewati ke konten")}</a>
    <header className="site-header"><nav className="shell nav" aria-label={t("Main navigation","Navigasi utama")}>
      <a className="brand" href="#home" aria-label="Rizki Sundara"><span className="brand-symbol">rs<span>.</span></span><span className="brand-text">rizki<span>sundara</span></span></a>
      <div className="nav-links">{nav.map(([id,en,indo])=><a key={id} className={section===id?"active":""} href={`#${id}`} aria-current={section===id?"location":undefined}>{t(en,indo)}</a>)}</div>
      <div className="nav-actions"><button className="lang" onClick={toggleLang} aria-label={t("Switch to Indonesian","Ganti ke bahasa Inggris")}>{lang==="en"?"EN / ID":"ID / EN"}</button><button className="icon-button" onClick={toggleTheme} aria-label={t("Toggle color theme","Ganti tema")}>{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button><button className="icon-button menu-button" onClick={()=>setMenu(v=>!v)} aria-expanded={menu} aria-controls="mobile-nav" aria-label={t("Menu","Menu")}>{menu?<X size={20}/>:<Menu size={20}/>}</button></div>
    </nav>{menu&&<nav id="mobile-nav" className="mobile-nav shell">{nav.map(([id,en,indo])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{t(en,indo)}<ArrowUpRight size={16}/></a>)}</nav>}<div className="progress-track"><div style={{width:`${progress}%`}}/></div></header>
    <main id="main" className="min-h-screen">
      <section id="home" className="hero shell">
        <motion.div className="hero-copy" initial={false} animate={{y:0,opacity:1}} transition={{duration:reduced?0:.45}}>
          <div className="eyebrow hero-eyebrow"><span className="signal"/><span>{t("SOFTWARE ENGINEER / JAKARTA, ID","SOFTWARE ENGINEER / JAKARTA, ID")}</span></div>
          <p className="hello">{t("Hello, I'm", "Halo, saya")}</p>
          <h1>Rizki<br/><em>Sundara.</em></h1>
          <div className="role-line">Full Stack Software Engineer</div>
          <div className="hero-description"><span className="vertical-rule"/><p>{t("I build software for banking teams, medical case managers, and tournament organizers. My work connects the screens they use to the systems behind them.","Saya banyak bekerja dengan C#, .NET, dan SQL Server. Di IForce, saya ikut membuat aplikasi untuk Trakindo. Tim mereka sekarang bisa menyetujui pengajuan dari berbagai sistem cukup dengan sekali login.")}</p></div>
          <div className="hero-actions"><a className="button primary" href="#work">{t("Explore my work","Lihat portofolio")}<ArrowUpRight size={19}/></a><a className="button secondary" href="#contact">{t("Get in touch","Hubungi saya")}</a></div>
          <div className="hero-social"><External href={socials.github}><Github size={17}/> GitHub</External><External href={socials.linkedin}><Linkedin size={17}/> LinkedIn</External><span className="location"><MapPin size={15}/> Jakarta, Indonesia</span></div>
        </motion.div>
        <motion.div className="hero-visual" initial={false} animate={{opacity:1}} transition={{duration:reduced?0:.5}}>
          <div className="portrait-card"><div className="portrait-top"><span>{t("PROFILE","PROFIL")}</span><span className="portrait-index">RS — 26</span></div><button className="portrait-button" onClick={()=>setPhoto("portrait")} aria-label={t("Enlarge profile photo","Perbesar foto profil")}><Image src={`${imageRoot}/portrait.webp`} width={1536} height={1024} sizes="(max-width: 900px) 90vw, 42vw" priority alt={t("Rizki wearing black batik","Rizki mengenakan batik hitam")}/><span className="expand"><Maximize2 size={17}/></span></button><div className="portrait-caption"><div><strong>Rizki Sundara</strong><span>Full Stack Software Engineer</span></div><span className="code-symbol"><Code2 size={26}/></span></div></div>
          <motion.div className="floating-note" initial={false} animate={reduced?{y:0}:{y:[0,-6,0]}} transition={reduced?{duration:0}:{duration:5,repeat:Infinity,ease:"easeInOut"}}><span className="float-icon"><Workflow size={20}/></span><div><strong>{t("From logic to interface","Pengembangan web")}</strong><small>{t("End-to-end development","Frontend dan backend")}</small></div></motion.div>
          
        </motion.div>
        <div className="hero-footer"><div className="stack-line"><span>{t("WORKING WITH","TEKNOLOGI")}</span><div>{["C# / .NET","Golang","React / Next.js","SQL"].map(x=><span key={x}>{x}</span>)}</div></div><a href="#work" className="scroll-link" aria-label={t("Scroll to work","Lihat bagian proyek")}><ArrowDown size={18}/></a></div>
      </section>
      <section className="facts"><div className="shell facts-grid">{[["2.5+",t("Years professional experience","Tahun pengalaman kerja")],["02",t("Public personal projects","Aplikasi pribadi dengan demo")],["03",t("Professional developer roles","Posisi pengembang")],["Full stack",t("Backend to user interface","Backend hingga antarmuka")]].map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
      <section id="work" className="section shell"><SectionHeading number="01" eyebrow={t("SELECTED WORK","PROYEK PILIHAN")} title={t("Software in practice","Beberapa proyek saya")} description={t("Try two independent products or see what I contributed to internal systems.","Catatin dan LAGAKAMI bisa langsung dicoba. Untuk proyek kantor, saya ceritakan bagian yang saya kerjakan.")}/>
        <div className="work-toolbar"><div className="filter-list" role="group" aria-label={t("Filter projects","Filter proyek")}>{([["all",t("All projects","Semua proyek")],["personal",t("Personal","Pribadi")],["professional",t("Professional","Profesional")]] as [Filter,string][]).map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><span className="work-count">{ids.filter(id=>filter==="all"||(filter==="personal")===projects[id].personal).length} {t("PROJECTS","PROYEK")}</span></div>
        <div className="project-grid">{ids.filter(id=>filter==="all"||(filter==="personal")===projects[id].personal).map(id=>{const p=projects[id];return <motion.article key={id} className={`project-card ${p.personal?"personal":"professional"}`} layout={reduced?false:"position"} initial={false} whileHover={reduced?undefined:{y:-4}} transition={{duration:.2}}>
          <div className="project-media"><ProjectArt id={id} lang={lang}/>{id==="catatin"&&<button className="video-trigger" type="button" onClick={()=>{videoRef.current?.showModal();setVideoOpen(true);}}><span className="video-trigger-label"><Play size={15} aria-hidden="true"/>{t("Watch video","Tonton video")}</span></button>}</div><div className="project-body"><div className="project-meta"><span className={`type-dot ${p.personal?"public":""}`}/>{p.role?.[lang] ?? (p.personal?t("PERSONAL / PUBLIC DEMO","PROYEK PRIBADI"):t("PROFESSIONAL / INTERNAL","APLIKASI INTERNAL"))}</div><h3>{title(p)}</h3><p>{p[lang].desc}</p><Tags tags={p.tags.slice(0,5)}/><div className="project-actions"><button className="text-button" onClick={()=>setActive(id)}>{t("Project details","Detail proyek")}<ArrowUpRight size={16}/></button>{p.link&&<External className="demo-link" href={p.link}>{t("Live demo","Buka demo")}</External>}</div></div></motion.article>})}</div>
      </section>
      <section id="experience" className="section experience"><div className="shell"><SectionHeading number="02" eyebrow={t("CAREER JOURNEY","PERJALANAN KARIER")} title={t("My career in software","Pengalaman kerja")} description={t("From .NET training to enterprise software delivery across healthcare, approvals, and banking automation.","Saya mulai belajar .NET di XSIS. Setelah itu, saya bekerja di Syntech dan IForce sebelum bergabung dalam proyek di BNI.")}/><div className="experience-layout"><div className="career-aside"><div className="aside-card"><span className="eyebrow">{t("CURRENT FOCUS","FOKUS SAAT INI")}</span><div className="aside-icon"><Workflow size={28}/></div><h3>{t("Banking operations","Operasional perbankan")}</h3><p>{t("Application features, REST APIs, RPA integration, testing, and delivery.","Saya membuat API dan memakai UiPath untuk menjalankan proses rutin di aplikasi bank.")}</p><span className="aside-foot"><span className="signal"/> BNI · 2026</span></div><div className="education-card"><GraduationCap size={23}/><div><strong>Universitas Pendidikan Indonesia</strong><span>{t("B.Eng. Electrical Engineering","S1 Teknik Elektro")}</span></div></div></div><div className="timeline">{jobData.map((job,i)=><article key={job.name} className={`job ${openJob===i?"expanded":""}`}><span className="timeline-dot"/><button className="job-head" onClick={()=>setOpenJob(v=>v===i?null:i)} aria-expanded={openJob===i} aria-controls={`job-${i}`}><div className="job-title"><span className="job-date">{t(job.date,job.dateId)}</span><h3>{job.role}</h3><p>{job.name} <span>· {t(job.label,job.labelId)}</span></p></div><span className="job-chevron"><ChevronDown size={20}/></span></button><div id={`job-${i}`} hidden={openJob!==i} className="job-body"><ul>{job.desc.map(key=><li key={key}><Check size={15}/><span>{text(key,lang)}</span></li>)}</ul><Tags tags={job.stack}/></div></article>)}</div></div></div></section>
      <section id="about" className="section shell"><SectionHeading number="03" eyebrow={t("ABOUT ME","TENTANG SAYA")} title={t("From circuits to software","Dari Teknik Elektro ke .NET")} description={t("I studied electrical engineering before writing software for business operations.","Saya kuliah Teknik Elektro di Universitas Pendidikan Indonesia. Setelah lulus, saya ikut bootcamp .NET di XSIS Academy.")}/><div className="about-grid"><div className="about-copy"><div className="eyebrow"><span className="small-rule"/>{t("A LITTLE BACKSTORY","SEDIKIT CERITA")}</div><h3>{t("I like solving the problem behind the code.","Aplikasi pertama saya di XSIS")}</h3><p>{text("aboutDesc",lang)}</p><p>{text("storyBody",lang)}</p><div className="process"><div><span>01</span><strong>{t("Understand","Pahami")}</strong><small>{t("The real problem","Masalah sebenarnya")}</small></div><div><span>02</span><strong>{t("Design","Rancang")}</strong><small>{t("A clear solution","Solusi yang jelas")}</small></div><div><span>03</span><strong>{t("Build & iterate","Bangun & evaluasi")}</strong><small>{t("Test and improve","Uji dan perbaiki")}</small></div></div></div><div className="about-photo"><button onClick={()=>setPhoto("aws-photo")} aria-label={t("Enlarge personal photo","Perbesar foto pribadi")}><Image src={`${imageRoot}/aws-photo.webp`} width={1152} height={1536} sizes="(max-width: 900px) 90vw, 35vw" alt={t("Rizki beside the AWS logo","Rizki di samping logo AWS")}/><span className="expand"><Maximize2 size={17}/></span></button><div className="about-caption"><span>{t("Personal photo collection","Foto pribadi")}</span><span>02 / 02</span></div></div></div></section>
      <section id="skills" className="section toolkit"><div className="shell"><SectionHeading number="04" eyebrow={t("TECHNICAL TOOLKIT","KEAHLIAN TEKNIS")} title={t("The tools behind the work.","Teknologi yang saya pakai")} description={t("Technologies used in professional work and independent projects, grouped by their role in building software.","Di kantor saya banyak memakai .NET dan SQL Server. Untuk Catatin dan LAGAKAMI, saya memakai Next.js dan PostgreSQL.")}/><div className="skills-grid">{groups.map(g=><div key={g.title} className="skill-card"><span className="skill-icon"><g.icon size={25}/></span><h3>{t(g.title,g.id)}</h3><Tags tags={g.tags}/></div>)}</div></div></section>
      <section id="contact" className="section shell contact"><div className="contact-card"><div className="eyebrow"><span>05</span><span className="small-rule"/>{t("CONTACT","KONTAK")}</div><h2>{t("Let's build something", "Punya proyek")}<br/><em>{t("worth using.","untuk dibahas?")}</em></h2><p>{t("Have a project or role in mind? Message me on LinkedIn or explore my code on GitHub.","Kalau ingin ngobrol soal proyek atau peluang kerja, hubungi saya di LinkedIn. Kode proyek pribadi saya bisa dilihat di GitHub.")}</p><div className="hero-actions"><External href={socials.linkedin} className="button primary"><Linkedin size={18}/> LinkedIn</External><External href={socials.github} className="button secondary"><Github size={18}/> GitHub</External></div><div className="contact-decoration" aria-hidden="true">&lt;/&gt;</div></div><footer><span>© 2026 Rizki Sundara</span><a href="#home">{t("Back to top","Kembali ke atas")}<ArrowUp size={15}/></a></footer></section>
    </main>
    <dialog ref={detailsRef} className="dialog" onClose={()=>setActive(null)} onClick={outside} aria-labelledby="project-title">{project&&<><div className="dialog-head"><div><span className="eyebrow">{project.personal?t("PERSONAL PROJECT","PROYEK PRIBADI"):t("PROFESSIONAL PROJECT","PROYEK PROFESIONAL")}</span><h2 id="project-title" aria-live="polite">{title(project)}</h2></div><button className="icon-button" onClick={()=>detailsRef.current?.close()} aria-label={t("Close","Tutup")}><X size={21}/></button></div><div className="dialog-body"><p>{project[lang].desc}</p><h3>{t("Scope & engineering","Fitur dan kontribusi")}</h3><ul>{project[lang].points.map(p=><li key={p}>{p}</li>)}</ul><Tags tags={project.tags}/><p className="disclosure">{project[lang].note}</p>{project.link&&<External href={project.link} className="button primary">{t("Open live application","Buka aplikasi")}</External>}</div><nav className="project-pager" aria-label={t("Browse project details","Jelajahi detail proyek")}><button onClick={()=>stepProject(-1)}>← {t("Previous","Sebelumnya")}</button><button onClick={()=>stepProject(1)}>{t("Next project","Proyek berikutnya")} →</button></nav></>}</dialog>
    <dialog ref={videoRef} className="dialog video-dialog" onClose={()=>setVideoOpen(false)} onClick={outside} aria-labelledby="catatin-video-title">
      <div className="dialog-head">
        <h2 id="catatin-video-title">{t("Catatin motion video","Video Catatin")}</h2>
        <button className="icon-button" type="button" onClick={()=>videoRef.current?.close()} aria-label={t("Close video","Tutup video")}><X size={21}/></button>
      </div>
      <div className="video-fallback">
        <External className="demo-link" href="https://www.youtube.com/shorts/zu1wbPhqa2g">{t("Watch on YouTube","Tonton di YouTube")}</External>
      </div>
      {videoOpen&&<iframe
        className="catatin-player"
        title={t("Catatin motion video on YouTube","Video Catatin di YouTube")}
        src="https://www.youtube.com/embed/zu1wbPhqa2g?playsinline=1"
        allow="encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />}
    </dialog>
    <dialog ref={photoRef} className="photo-dialog" onClose={()=>setPhoto(null)} onClick={outside} aria-label={t("Photo preview","Pratinjau foto")}>{photo&&<><button className="icon-button close-photo" onClick={()=>photoRef.current?.close()} aria-label={t("Close photo","Tutup foto")}><X size={22}/></button><Image src={`${imageRoot}/${photo}.webp`} width={photo==="portrait"?1536:1152} height={photo==="portrait"?1024:1536} sizes="90vw" alt={t("Personal portrait","Foto pribadi")}/></>}</dialog>
  </>;
}
