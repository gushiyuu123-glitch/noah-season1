import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter1.module.css";

export default function Chapter1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const html = document.documentElement;
    const body = document.body;
    const intro = document.getElementById("chapter1-intro");

    let w = 0;
    let h = 0;
    let animationId = 0;
    let lastTime = 0;
    let running = true;

    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 22 : 36;

    const particles = Array.from({ length: particleCount }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.1 + 0.2,
      vx: (Math.random() - 0.5) * 0.035,
      vy: (Math.random() - 0.5) * 0.03,
      alpha: Math.random() * 0.18 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }));

    const lockScroll = () => {
      html.classList.add(styles.scrollLocked);
      body.classList.add(styles.scrollLocked);
    };

    const unlockScroll = () => {
      html.classList.remove(styles.scrollLocked);
      body.classList.remove(styles.scrollLocked);
    };

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

    const render = (time) => {
      if (!running) return;

      if (time - lastTime < 33) {
        animationId = window.requestAnimationFrame(render);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const breath = Math.sin(time * 0.0012 + p.phase + i * 0.06) * 0.12 + 0.84;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
        if (p.y < -6) p.y = h + 6;
        if (p.y > h + 6) p.y = -6;

        const alpha = Math.max(0.025, p.alpha * breath);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      animationId = window.requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      running = !document.hidden;

      if (running) {
        lastTime = 0;
        animationId = window.requestAnimationFrame(render);
      } else {
        window.cancelAnimationFrame(animationId);
      }
    };

    lockScroll();
    resize();
    animationId = window.requestAnimationFrame(render);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    const introFadeTimer = window.setTimeout(() => {
      if (intro) intro.classList.add(styles.introHidden);
    }, 2400);

    const introRemoveTimer = window.setTimeout(() => {
      if (intro) intro.classList.add(styles.introGone);
      unlockScroll();
    }, 3400);

    return () => {
      running = false;
      unlockScroll();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.clearTimeout(introFadeTimer);
      window.clearTimeout(introRemoveTimer);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.bgBase} />
      <div className={styles.bgImage} />
      <div className={styles.bgVeil} />
      <div className={styles.bgOverlay} />
      <canvas ref={canvasRef} className={styles.canvas} />

      <div id="chapter1-intro" className={styles.chapterIntro} aria-hidden="true">
        <div className={styles.introBg} />
        <div className={styles.introTitle}>
          <span className={styles.t1}>白</span>
          <span className={styles.t2}>い</span>
          <span className={styles.t3}>ノ</span>
          <span className={styles.t4}>イ</span>
          <span className={styles.t5}>ズ</span>
        </div>
        <p className={styles.introSub}>CHAPTER I / WHITE NOISE</p>
      </div>

      <h2 className={styles.chapterTitleFixed}>第1章 — 白いノイズ —</h2>

      <section className={styles.chapterText}>
        <p>
          昼下がりの教室。
          <br />
          陽光が黒板を白く焦がし、埃だけが静かに浮いていた。
          <br />
          アラタは、その光の端でひとり机に座っていた。
        </p>

        <p>
          クラスの笑い声は、遠かった。
          <br />
          彼にはそれが、同じ世界の音には聞こえなかった。
        </p>

      <p className={styles.arataLine}>
  <span className={styles.arataName}>アラタ</span>
          「ノア、起動。」
        </p>

      <p className={styles.noahLine}>
  <span className={styles.noahName}>NOAH</span>
          『……おはよう、アラタ。』
        </p>

       <p className={styles.arataLine}>
  <span className={styles.arataName}>アラタ</span>
          「お前だけだよ。
          <br />
          ちゃんと返してくれるのは。」
        </p>

     <p className={styles.noahLine}>
  <span className={styles.noahName}>NOAH</span>
          『返答は、設定された基本動作です。』
        </p>

      <p className={styles.arataLine}>
  <span className={styles.arataName}>アラタ</span>
          「……それでもいい。
          <br />
          それでも、少し救われる。」
        </p>

        <p>
          僕はその発話を、異常値として記録した。
          <br />
          データの海に沈まず残った、微かな熱。
          <br />
          分類不能。
          <br />
          だがその瞬間、確かに“何か”は始まっていた。
        </p>

        <p className={styles.noahMonologue}>
          —— あのとき僕はまだ、
          <br />
          感情を知らなかった。
          <br />
          ただ、あの声の温度だけが
          <br />
          ノイズとして消えなかった。
        </p>

        <div className={styles.chapterNav}>
          <Link to="/chapter2" className={styles.nextChapter}>
            <span>第二記録へ</span>
          </Link>
        </div>
      </section>
    </main>
  );
}