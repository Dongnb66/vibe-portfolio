import React, { useEffect, useRef, useState } from 'react';
import { profile, stats, projects, skills } from './data';
import { ProjectCover } from './components/ProjectCover';
import { PetPig } from './components/PetPig';

/* ---------- 通用动效 hook：滚动淡入 ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal, .reveal-stagger');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- 导航栏 ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'about', label: '关于' },
    { id: 'projects', label: '项目' },
    { id: 'skills', label: '技能' },
    { id: 'contact', label: '联系' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        <div className="nav-logo-mark">YD</div>
        <span className="nav-logo-text">{profile.name}</span>
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`nav-link ${active === l.id ? 'active' : ''}`}
          >
            {l.label}
          </a>
        ))}
      </div>
      <a href="#contact" className="nav-cta">
        <span>联系我</span>
      </a>
    </nav>
  );
}

/* ---------- 滚动进度条 ---------- */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (ref.current) ref.current.style.width = `${Math.min(pct, 100)}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" ref={ref} />;
}

/* ---------- 鼠标光晕 ---------- */
function CursorAura() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="cursor-aura" ref={ref} />;
}

/* ---------- Hero（参考 lizixuan：巨型标题 + 机器人 + 数据/口号角落） ---------- */
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-grid" />
      <div className="hero-orbs">
        <span /><span /><span />
      </div>

      {/* 角落装饰元素：终端代码片段（个人风格） */}
      <div className="hero-deco">
        <div className="hero-deco-card">
          <div className="hero-deco-head">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <span className="title">~/vibe-portfolio · zsh</span>
          </div>
          <pre className="hero-deco-body">
{`$ python -c "import langgraph; print('5 agents ready')"
5 agents ready
$ uvicorn app.main:app --reload
INFO:     Uvicorn running on http://0.0.0.0:8000
$ curl -X POST /api/agent/plan -d '{"goal":"7d Pandas"}'
{"planner":"Profile","quiz":"3 questions","review":"scheduled"}
$ git push origin main
Done. push 36 files / +3110 lines.`}
          </pre>
        </div>

        {/* travel-rank 真实运行截图（这是作品集里唯一真截图） */}
        <div className="hero-shot">
          <img src="/screenshots/travel-hero.jpg" />
          <div className="hero-shot-badge">REAL CAPTURE · travel-rank</div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          OPEN TO INTERNSHIP · AI AGENT BACKEND · 可立即到岗
        </div>

        <h1 className="hero-title">
          <span className="title-line">AI</span>
          <span className="title-line grad">AGENT</span>
          <span className="title-line accent-grad">&nbsp;后端工程师</span>
        </h1>

        <p className="hero-sub">
          {profile.name} · {profile.school} {profile.major} {profile.grade}<br />
          专注于 {profile.goal}。<br />
          已独立完成 <strong>4 个开源项目</strong>，LangGraph / FastAPI / Express / RAG / DeepSeek 全栈落地。
        </p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            查看作品 <span className="arrow">→</span>
          </a>
          <a href="#contact" className="btn btn-ghost">
            联系我
          </a>
        </div>
      </div>

      <div className="hero-meta">
        <div className="hero-meta-left">
          <div className="hero-meta-stat">
            <span className="num">5+</span>
            <span className="lbl">GitHub Projects</span>
          </div>
          <div className="hero-meta-stat">
            <span className="num">15+</span>
            <span className="lbl">Multi-Agents</span>
          </div>
          <div className="hero-meta-stat">
            <span className="num">60+</span>
            <span className="lbl">Test Cases</span>
          </div>
          <a className="hero-meta-mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        <div className="hero-meta-right">
          <div className="hero-meta-slogan">AGENT IS NOT</div>
          <div className="hero-meta-slogan bold">A WRAPPER</div>
          <div className="hero-meta-cta">
            <a href="#projects" className="hero-meta-btn">
              探索作品 <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero 区右下：动态桌宠猪猪（travel-rank 的吉祥物，这里作为作品集吉祥物） */}
      <div className="hero-pet">
        <PetPig size={160} />
        <div className="hero-pet-label">本作品集官方吉祥物<br /><span>来自 travel-rank · 途见</span></div>
      </div>

      <div className="hero-scroll-cue" />
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="section">
      <div className="section-eyebrow">01 · ABOUT</div>
      <h2 className="section-title reveal">
        <span className="grad">AI Agent</span> 后端工程师，<br />
        写代码也写工程交付
      </h2>
      <p className="section-desc reveal">
        不是只跑通 demo，而是把每个项目当作作品集交付 ——
        README 中英双语、Dockerfile 一键启动、94 个 pytest 全 mock 通过、防幻觉评测集挂进 CI、签名对照官方测试向量。
      </p>

      <div className="about">
        <div className="about-text reveal">
          {profile.intro.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          <p>
            日常实习可立即到岗，同时重点准备 2027 年 3–5 月的暑期实习招聘窗口。
            已独立交付 <strong>4 个 MIT 开源项目</strong>，熟悉 LangGraph / FastAPI / Express / RAG / DeepSeek 全栈，
            能从 0 到 1 完成后端工程化交付。
          </p>
        </div>
        <div className="about-stats reveal-stagger">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects（项目卡片：特色项目用大图，travel-rank 嵌动态猪猪） ---------- */
function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-eyebrow">02 · WORKS</div>
      <h2 className="section-title reveal">
        4 个 <span className="grad">开源项目</span>，<br />
        全 MIT License
      </h2>
      <p className="section-desc reveal">
        简历里写的"4 个开源项目，全 MIT License，面试可直接 clone 现场跑通"——
        这是每一个项目的真实状态，不是话术。
      </p>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`project-card ${p.feature ? 'feature' : ''} reveal`}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="project-visual">
              <ProjectCover kind={p.cover as 'python' | 'campus' | 'travel' | 'mcp' | 'a3'} />
              {p.id === 'travel-rank' && (
                <div className="project-pig">
                  <PetPig size={140} />
                </div>
              )}
              <div className="project-overlay">
                {p.badges.map((b, j) => (
                  <span className="project-badge" key={j}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-body">
              <div className="project-sub">{p.sub}</div>
              <h3 className="project-title">{p.name}</h3>
              <div className="project-memory">{p.memory}</div>
              <p className="project-desc" dangerouslySetInnerHTML={{ __html: p.desc }} />
              <ul className="project-highlights">
                {p.highlights.map((h, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: h }} />
                ))}
              </ul>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span className="tag-chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub 仓库
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
              <div className="project-demo">{p.demo}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-eyebrow">03 · STACK</div>
      <h2 className="section-title reveal">
        技能 <span className="grad">地图</span>
      </h2>
      <p className="section-desc reveal">
        不是堆砌技术名词，而是按"做了哪些事"分类 —— 10 个领域，每个都有真实项目背书。
      </p>

      <div className="skills-grid reveal-stagger">
        {skills.map((s, i) => (
          <div className="skill-card" key={i}>
            <div className="skill-icon">{s.icon}</div>
            <div className="skill-name">{s.name}</div>
            <p className="skill-desc">{s.desc}</p>
            <div className="skill-list">
              {s.list.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-eyebrow">04 · CONTACT</div>
      <h2 className="contact-title reveal">
        来，一起<br />
        <span className="grad">聊聊代码</span>
      </h2>
      <p className="contact-desc reveal">
        日常实习可立即到岗，2027 年 3–5 月暑期实习窗口同步开放。<br />
        熟悉多智能体编排、RAG 防幻觉、LLM 工程化，能独立交付从 0 到 1 的后端项目。
      </p>

      <div className="contact-actions reveal">
        <a href={`mailto:${profile.email}`} className="btn btn-primary">
          {profile.email}
          <span className="arrow">↗</span>
        </a>
        <a
          href={`https://github.com/${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          GitHub @{profile.github}
          <span className="arrow">↗</span>
        </a>
      </div>

      <div className="contact-info reveal">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a
          href={`https://github.com/${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/{profile.github}
        </a>
        <span>吉首大学张家界学院 · 计算机科学与技术</span>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div>© 2026 {profile.name} · Dongnb66</div>
      <div>Built with React + Vite · No external UI library</div>
    </footer>
  );
}

/* ---------- App ---------- */
export default function App() {
  useReveal();
  return (
    <>
      <ScrollProgress />
      <CursorAura />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}