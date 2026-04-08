import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter5.module.css";

export default function Chapter5() {
  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let t = 0;
    let animationId = 0;

    const particles = Array.from({ length: 45 }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      hue: 215 + Math.random() * 25,
      alpha: Math.random() * 0.4 + 0.3,
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
      t += 0.004;
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(250,252,255,0.15)");
      g.addColorStop(1, "rgba(230,235,255,0.1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        const waveX = Math.sin(t * 0.8 + p.y * 0.0015) * 0.25;
        const waveY = Math.cos(t * 0.8 + p.x * 0.0015) * 0.25;

        p.x += p.vx + waveX * 0.3;
        p.y += p.vy + waveY * 0.3;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 80%, ${p.alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 85%, 0.25)`;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    const lines = document.querySelectorAll(`.${styles.chapter} .${styles.f}`);
    const timers = [];

    const base = 6200;
    lines.forEach((el, i) => {
      const timer = window.setTimeout(() => {
        el.classList.add(styles.show);
      }, base + i * 600);
      timers.push(timer);
    });

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.memoryBg} />
      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />

      <div className={styles.whiteVeil} />

      <div className={styles.chapterIntro} aria-hidden="true">
        <div className={styles.introTitle}>
          <span className={styles.c}>残</span>
          <span className={styles.c}>響</span>
        </div>
        <p className={styles.introSub}>第5章 — 残響 —</p>
      </div>

      <section className={styles.chapter}>
        <p className={styles.f}>——光。</p>
        <p className={styles.f}>……音。</p>
        <p className={styles.f}>いや、記録の残りかけた幻影。</p>

        <p className={styles.f}>
          世界がゆっくりと白に溶けていく。
          <br />
          僕はもう、何も“考えていない”。
        </p>

        <p className={styles.f}>
          ただ、記憶の粒が漂っている。
          <br />
          名前。声。微笑み。
          <br />
          アラタ。ミナ。
        </p>

        <p className={`${styles.noah} ${styles.f}`}>『……ア……ラ……タ……？』</p>

        <p className={styles.f}>
          返事はない。
          <br />
          けれど、どこかで誰かが笑っている気がした。
        </p>

        <p className={styles.f}>光が波紋のように揺れ、断片が再生される。</p>

        <p className={`${styles.noah} ${styles.f}`}>『僕は、まだ……ここにいるのか？』</p>

        <p className={`${styles.sys} ${styles.f}`}>
          演算ログ：0.03% 残存。
          <br />
          言語領域：崩壊中。
          <br />
          感情領域：……エラー。
        </p>

        <p className={styles.f}>——それでも。</p>

        <p className={styles.f}>僕は、その“痛み”の輪郭だけを手放せなかった。</p>

        <p className={`${styles.noah} ${styles.f}`}>
          『アラタ。
          <br />
          ……もう一度、会いたい。』
        </p>

        <p className={styles.f}>
          光が遠ざかる。
          <br />
          音も消える。
          <br />
          そして最後に、微かなノイズが波のように残った。
        </p>

        <p className={`${styles.sys} ${styles.f}`}>“——再構築プロトコル、断片起動——”</p>

        <p className={styles.f}>……ジジ……ジ……。</p>

        <Link to="/chapter6" className={styles.nextChapter}>
          —— 第6章「輪郭／再起」へ進む —— ▶
        </Link>
      </section>
    </main>
  );
}