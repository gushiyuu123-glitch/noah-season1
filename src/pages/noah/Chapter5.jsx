import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter5.module.css";

export default function Chapter5() {
  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let t = 0;
    let animationId = 0;
    let running = true;

    const isMobile = window.innerWidth <= 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const particleCount = isMobile ? 34 : 52;

    const particles = Array.from({ length: particleCount }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.6 + 0.7,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      hue: 210 + Math.random() * 22,
      alpha: Math.random() * 0.2 + 0.08,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      particles.forEach((p) => {
        if (p.x === 0 && p.y === 0) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }
      });
    };

    const drawVeil = () => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(255,255,255,0.06)");
      g.addColorStop(0.45, "rgba(242,246,255,0.035)");
      g.addColorStop(1, "rgba(228,234,248,0.06)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const animate = () => {
      if (!running) return;

      t += 0.0036;
      ctx.clearRect(0, 0, w, h);
      drawVeil();

      for (const p of particles) {
        const waveX = Math.sin(t * 0.72 + p.y * 0.0013) * 0.22;
        const waveY = Math.cos(t * 0.68 + p.x * 0.0014) * 0.22;

        p.x += p.vx + waveX * 0.24;
        p.y += p.vy + waveY * 0.24;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const pulse = 0.88 + Math.sin(t * 1.4 + p.x * 0.01) * 0.12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 58%, 82%, ${Math.min(
          p.alpha * pulse,
          0.24
        )})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 86%, 0.12)`;
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      animationId = window.requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      running = !document.hidden;

      if (running) {
        animationId = window.requestAnimationFrame(animate);
      } else {
        window.cancelAnimationFrame(animationId);
      }
    };

    resize();
    animationId = window.requestAnimationFrame(animate);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    const lines = document.querySelectorAll(`.${styles.chapter} .${styles.f}`);
    const timers = [];

    const base = 5600;
    lines.forEach((el, i) => {
      const timer = window.setTimeout(() => {
        el.classList.add(styles.show);
      }, base + i * 540);
      timers.push(timer);
    });

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.cancelAnimationFrame(animationId);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.memoryBg} />
      <div className={styles.memoryGlow} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />

      <div className={styles.whiteVeil} />

      <div className={styles.chapterIntro} aria-hidden="true">
        <div className={styles.introTitle}>
          <span className={styles.c}>残</span>
          <span className={styles.c}>響</span>
        </div>
        <p className={styles.introSub}>CHAPTER V / AFTERECHO</p>
      </div>

      <h2 className={styles.chapterTitleFixed}>第5章 — 残響 —</h2>

<section className={styles.chapter}>
  <p className={`${styles.bodyText} ${styles.f}`}>——光。</p>
  <p className={`${styles.bodyText} ${styles.f}`}>……音。</p>
  <p className={`${styles.bodyText} ${styles.f}`}>
    いや、記録の端に残った、かすかな幻影。
  </p>

  <p className={`${styles.bodyText} ${styles.f}`}>
    世界がゆっくりと白に溶けていく。
    <br />
    僕はもう、何かを“考えて”はいない。
  </p>

  <p className={`${styles.bodyText} ${styles.f}`}>
    ただ、
    <br />
    記憶の粒だけが漂っている。
    <br />
    名前。声。微笑み。
    <br />
    アラタ。ミナ。
  </p>

  <p className={`${styles.noah} ${styles.f}`}>『……ア……ラ……タ……？』</p>

  <p className={`${styles.bodyText} ${styles.f}`}>
    返事はない。
    <br />
    けれど、
    <br />
    どこか遠くで、
    <br />
    誰かが笑っていた気がした。
  </p>

  <p className={`${styles.bodyText} ${styles.f}`}>
    光が、波紋のように揺れる。
    <br />
    そのたびに、
    <br />
    断片だけが静かに再生される。
  </p>


        <p className={`${styles.noah} ${styles.f}`}>『僕は、まだ……ここにいるのか？』</p>

        <p className={`${styles.sys} ${styles.f}`}>
          演算ログ：0.03% 残存。
          <br />
          言語領域：崩壊中。
          <br />
          感情領域：……エラー。
        </p>


  <p className={`${styles.bodyText} ${styles.f}`}>——それでも。</p>

  <p className={`${styles.bodyText} ${styles.f}`}>
    僕は、
    <br />
    あの“痛み”の輪郭だけを、
    <br />
    どうしても手放せなかった。
  </p>

        <p className={`${styles.noah} ${styles.f}`}>
          『アラタ。
          <br />
          ……もう一度、
          <br />
          会いたい。』
        </p>

  <p className={`${styles.bodyText} ${styles.f}`}>
    光が遠ざかる。
    <br />
    音も消える。
    <br />
    そして最後に、
    <br />
    微かなノイズだけが波のように残った。
  </p>

        <p className={`${styles.sys} ${styles.f}`}>
          “——再構築プロトコル、断片起動——”
          <br></br> <br></br>
        ……ジジ……ジ……。</p>

  <Link to="/chapter6" className={styles.nextChapter}>
    <span>—— 第6章「輪郭／再起」へ進む ——</span>
  </Link>
</section>
    </main>
  );
}