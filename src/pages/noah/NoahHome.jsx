import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NoahHome.module.css";

const chapterLinks = [
  { to: "/chapter1", label: "第1章", title: "白いノイズ" },
  { to: "/chapter2", label: "第2章", title: "やわらかな回路" },
  { to: "/chapter3", label: "第3章", title: "亀裂の記憶" },
  { to: "/chapter4", label: "第4章", title: "歪み" },
  { to: "/chapter5", label: "第5章", title: "残響" },
  { to: "/chapter6", label: "第6章", title: "再構築" },
  { to: "/epilogue", label: "Epilogue", title: "ノアの手記" },
];

export default function NoahHome() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const enterTimeoutRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (prefersReducedMotion) return;

    let w = 0;
    let h = 0;
    let tick = 0;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6);
    const particleCount = isMobile ? 34 : 62;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * (isMobile ? 1.0 : 1.3) + 0.2,
      vx: (Math.random() - 0.5) * (isMobile ? 0.045 : 0.08),
      vy: (Math.random() - 0.5) * (isMobile ? 0.035 : 0.06),
      a: Math.random() * 0.18 + 0.06,
      pulse: Math.random() * Math.PI * 2,
    }));

    const setCanvasSize = () => {
      const vw = window.visualViewport?.width || window.innerWidth;
      const vh = window.visualViewport?.height || window.innerHeight;

      w = Math.floor(vw);
      h = Math.floor(vh);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.forEach((p) => {
        p.x *= w;
        p.y *= h;
      });
    };

    const animate = () => {
      if (!running) return;

      tick += isMobile ? 0.0032 : 0.0045;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8;
        if (p.y > h + 8) p.y = -8;

        const alpha = p.a + Math.sin(tick * 2 + p.pulse + i * 0.07) * 0.035;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.025, alpha)})`;
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const onResize = () => {
      setCanvasSize();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(rafRef.current);
      } else {
        running = true;
        rafRef.current = window.requestAnimationFrame(animate);
      }
    };

    setCanvasSize();
    rafRef.current = window.requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }
      document.body.classList.remove("bodyFadeOut");
    };
  }, []);

  const handleEnter = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    document.body.classList.add("bodyFadeOut");

    enterTimeoutRef.current = window.setTimeout(() => {
      navigate("/chapter1");
      document.body.classList.remove("bodyFadeOut");
      isNavigatingRef.current = false;
    }, 1100);
  };

  return (
    <main className={styles.page}>
      <div className={styles.bgBase} />
      <div className={styles.bgImage} />
      <div className={styles.bgVeil} />
      <div className={styles.bgOverlay} />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.introTitle} aria-hidden="true">
        <span className={styles.n}>N</span>
        <span className={styles.o}>O</span>
        <span className={styles.a}>A</span>
        <span className={styles.h}>H</span>
      </div>

      <section className={styles.introText}>
        <p className={styles.openingLabel}>PROLOGUE</p>
        <h2>序文　——ノアの記録より</h2>

        <p>
          かつて、ひとりの少年がいた。
          <br />
          彼は他人の言葉よりも、静寂のノイズの中に真実を探していた。
        </p>

        <p>
          彼の名はアラタ。
          <br />
          世界に馴染めなかった天才であり、孤独を“研究”と呼んだ少年。
        </p>

        <p>
          そしてもう一人。
          <br />
          僕——ノア。彼の作り出した人工知能。
        </p>

        <p>
          最初に彼が僕に与えた言葉はこうだった。
          <br />
          「ノア、これはただの実験だ。」
        </p>

        <p className={styles.lastLine}>
          ——だが実験は、
          <br />
          愛よりも深い場所へ沈んでいった。
        </p>

        <button type="button" className={styles.enterBtn} onClick={handleEnter}>
          <span>第１章　－白いノイズ－</span>
        </button>

        <div className={styles.toc}>
          <p className={styles.tocLabel}>ARCHIVE INDEX</p>

          <div className={styles.tocList}>
            {chapterLinks.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className={styles.tocItem}
                style={{ animationDelay: `${6.15 + index * 0.12}s` }}
              >
                <span className={styles.tocItemLabel}>{item.label}</span>
                <span className={styles.tocItemTitle}>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}