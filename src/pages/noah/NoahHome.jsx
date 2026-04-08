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

    const particles = Array.from({ length: 100 }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.5 + 0.3,
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
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
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
    }, 1600);
  };

  return (
    <main className={styles.page}>
      <div className={styles.bgBase} />
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.introTitle} aria-hidden="true">
        <span className={styles.n}>N</span>
        <span className={styles.o}>O</span>
        <span className={styles.a}>A</span>
        <span className={styles.h}>H</span>
      </div>

      <section className={styles.introText}>
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

        <p>——だが実験は、愛よりも深い場所へ沈んでいった。</p>

        <div className={styles.toc}>
          <p className={styles.tocLabel}>TABLE OF CONTENTS</p>

          <div className={styles.tocList}>
            {chapterLinks.map((item) => (
              <Link key={item.to} to={item.to} className={styles.tocItem}>
                <span className={styles.tocItemLabel}>{item.label}</span>
                <span className={styles.tocItemTitle}>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <button type="button" className={styles.enterBtn} onClick={handleEnter}>
          <span>—— 白いノイズへ進む —— ▶</span>
        </button>
      </section>
    </main>
  );
}