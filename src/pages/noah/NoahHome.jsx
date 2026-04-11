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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animationId = 0;
    let tick = 0;

    const particles = Array.from({ length: 78 }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.35 + 0.22,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.06,
      a: Math.random() * 0.22 + 0.08,
      pulse: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      particles.forEach((p) => {
        if (p.x === 0 && p.y === 0) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }
      });
    };

    const animate = () => {
      tick += 0.0045;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8;
        if (p.y > h + 8) p.y = -8;

        const alpha = p.a + Math.sin(tick * 2 + p.pulse + i * 0.07) * 0.04;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.03, alpha)})`;
        ctx.fill();
      });

      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  const handleEnter = () => {
    document.body.classList.add("bodyFadeOut");

    window.setTimeout(() => {
      navigate("/chapter1");
      document.body.classList.remove("bodyFadeOut");
    }, 1500);
  };

  return (
    <main className={styles.page}>
      <div className={styles.bgBase} />
      <div className={styles.bgImage} />
      <div className={styles.bgVeil} />
      <div className={styles.bgOverlay} />
      <canvas ref={canvasRef} className={styles.canvas} />

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
          ——だが実験は、<br></br>愛よりも深い場所へ沈んでいった。
        </p>

        <button type="button" className={styles.enterBtn} onClick={handleEnter}>
          <span>第一章　－白いノイズ－</span>
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