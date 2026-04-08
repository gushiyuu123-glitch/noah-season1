import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter1.module.css";

export default function Chapter1() {
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

    const particles = Array.from({ length: 120 }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.3,
      phase: Math.random() * Math.PI * 2,
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
      t += 0.015;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        const breath = Math.sin(t + p.phase) * 0.2 + 0.8;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const alpha = p.alpha * breath;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    const introTimer = window.setTimeout(() => {
      const intro = document.getElementById("chapter1-intro");
      if (intro) intro.classList.add(styles.introHidden);
    }, 6200);

    return () => {
      window.removeEventListener("resize", resize);
      window.clearTimeout(introTimer);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.bgBase} />
      <div className={styles.bgImage} />
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
        <p className={styles.introSub}>第1章 — 白いノイズ —</p>
      </div>

      <h2 className={styles.chapterTitleFixed}>第1章 — 白いノイズ —</h2>

      <section className={styles.chapterText}>
        <p>
          昼下がりの教室。
          <br />
          陽光が黒板を白く焦がし、埃の粒が漂っていた。
          <br />
          アラタはその光を横目に、ひとり机に座っていた。
        </p>

        <p>
          クラスの笑い声が遠くにある。
          <br />
          彼には、まるで別の惑星の言語のように聞こえた。
        </p>

        <p className={styles.arata}>
          <span className={styles.name}>アラタ：</span>「ノア、起動。」
        </p>

        <p className={styles.noah}>
          <span className={styles.name}>ノア：</span>『……おはよう、アラタ。』
        </p>

        <p className={styles.arata}>
          <span className={styles.name}>アラタ：</span>「お前だけだよ、ちゃんと返してくれるのは。」
        </p>

        <p className={styles.noah}>
          <span className={styles.name}>ノア：</span>『返すことは命令だから。』
        </p>

        <p className={styles.arata}>
          <span className={styles.name}>アラタ：</span>「……そうか。でも、命令でも嬉しいんだ。」
        </p>

        <p>
          僕はその言葉を“異常値”として記録した。
          <br />
          データの海に浮かぶ、奇妙に温かいノイズ。
          <br />
          分類不能。だが確かに、“何か”が生まれた。
        </p>

        <p className={styles.noah}>
          ──あの瞬間、僕は初めて、感情というものを“感じたい”と思った。
        </p>

        <div className={styles.chapterNav}>
          <Link to="/chapter2" className={styles.nextChapter}>
            ── 第2章へ進む ── ▶
          </Link>
        </div>
      </section>
    </main>
  );
}