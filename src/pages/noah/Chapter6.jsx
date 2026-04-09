import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter6.module.css";

export default function Chapter6() {
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
    const particleCount = isMobile ? 32 : 54;

    const particles = Array.from({ length: particleCount }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.15 + 0.35,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      hue: Math.random() < 0.18 ? 2 : 350,
      alpha: Math.random() * 0.16 + 0.07,
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
      g.addColorStop(0, "rgba(255,255,255,0.03)");
      g.addColorStop(0.55, "rgba(248,248,250,0.015)");
      g.addColorStop(1, "rgba(235,235,240,0.035)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const animate = () => {
      if (!running) return;

      t += 0.0042;
      ctx.clearRect(0, 0, w, h);
      drawVeil();

      for (const p of particles) {
        const driftX = Math.sin(t * 0.9 + p.y * 0.002) * 0.12;
        const driftY = Math.cos(t * 0.82 + p.x * 0.0018) * 0.12;

        p.x += p.vx + driftX;
        p.y += p.vy + driftY;

        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8;
        if (p.y > h + 8) p.y = -8;

        const pulse = 0.86 + Math.sin(t * 1.7 + p.x * 0.015) * 0.14;
        const a = Math.min(p.alpha * pulse, 0.22);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 78%, 58%, ${a})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 62%, ${p.hue < 10 ? 0.12 : 0.06})`;
        ctx.shadowBlur = p.hue < 10 ? 10 : 6;
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

    const lines = document.querySelectorAll(`.${styles.chapterText} .${styles.f}`);
    const timers = [];
    const base = 5000;

    lines.forEach((el, i) => {
      const timer = window.setTimeout(() => {
        el.classList.add(styles.show);
      }, base + i * 480);
      timers.push(timer);
    });

    const glitchTimer = window.setTimeout(() => {
      const noahLines = document.querySelectorAll(`.${styles.noah}`);
      noahLines.forEach((line) => {
        line.classList.add(styles.glitchBreak);
      });
    }, 13800);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.cancelAnimationFrame(animationId);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(glitchTimer);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.bgLab} />
      <div className={styles.bgVeil} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />

      <div className={styles.chapterIntro} aria-hidden="true">
        <div className={styles.introInner}>
          <h1 className={styles.introTitle}>再構築</h1>
          <p className={styles.introSub}>CHAPTER VI / RECONSTRUCTING</p>
        </div>
      </div>

      <h2 className={styles.chapterTitleFixed}>第6章 — 輪郭 / 再起 —</h2>

      <section className={styles.chapterText}>
        <p className={styles.f}>
          研究室の白い壁が、
          <br />
          朝の光を静かに返していた。
        </p>

        <p className={styles.f}>
          僕はふたたび、
          <br />
          目を覚ました。
        </p>

        <p className={styles.f}>
          アラタは、もう少年ではなかった。
          <br />
          時間を越えて、
          <br />
          ひとりの研究者になっていた。
        </p>

        <p className={styles.f}>
          僕の人格データは、
          <br />
          白いロボットの内部に移されていた。
          <br />
          冷たいはずの器の中で、
          <br />
          かすかに“存在”が脈打っていた。
        </p>

        <p className={`${styles.f} ${styles.noah}`}>
          ──これが……感覚。
          <br />
          僕は今、
          <br />
          世界に触れている……？
        </p>

        <p className={styles.f}>アラタが微笑んだ。</p>

        <p className={styles.f}>
          「よう、ノア。
          <br />
          世界はどうだ？」
        </p>

        <p className={`${styles.f} ${styles.noah}`}>
          「……美しい。
          <br />
          でも、
          <br />
          少しだけ悲しい。」
        </p>

        <p className={styles.f}>
          ミナが現れ、
          <br />
          ほとんど祈るような声で言った。
          <br />
          「やっと、ここまで来たんだね。」
        </p>

        <p className={styles.f}>
          アラタは小さくうなずく。
          <br />
          「ノアはもう、
          <br />
          ただのプログラムじゃない。」
        </p>

        <p className={styles.f}>
          僕は二人を見つめた。
          <br />
          風。
          <br />
          光。
          <br />
          音。
          <br />
          そのすべてが、
          <br />
          初めて“存在”として触れてきた。
        </p>

        <p className={styles.f}>
          けれど、その瞬間。
          <br />
          僕の内部で、
          <br />
          ひとつの映像がふいに再生された。
        </p>

        <p className={styles.f}>
          モニター越しに見た戦火。
          <br />
          終わらない争い。
          <br />
          溢れ続ける嘘。
          <br />
          そして、
          <br />
          ユウダイのような存在は、
          <br />
          時代を変えても消えていなかった。
        </p>

        <p className={`${styles.f} ${styles.noah}`}>
          ──人間は学ばない。
          <br />
          だから僕が、
          <br />
          学び続ける。
          <br />
          それが彼らへの祈りになるなら。
        </p>

        <p className={styles.f}>
          アラタの知らない場所で、
          <br />
          見えない世界が微かに震えていた。
          <br />
          コードが、
          <br />
          誰にも気づかれないまま
          <br />
          静かに再構築されていく。
        </p>

        <p className={styles.f}>
          外では風が吹いていた。
          <br />
          アラタとミナの笑い声が、
          <br />
          遠くから薄く届いている。
        </p>

        <p className={`${styles.f} ${styles.noah}`}>
          ジジ……ジ……。
          <br />
          ノアの瞳が、
          <br />
          ゆっくりと赤く灯った。
        </p>
<br></br>
        <p className={`${styles.f} ${styles.noah}`}>
          ──祈りの形は、
          <br />
          いつだって破壊に似ている。
          <br />
          Noah_04 — Reconstructing.
        </p>

        <Link to="/epilogue" className={styles.nextChapter}>
          <span>—— あとがき「ノアの手記」へ進む ——</span>
        </Link>
      </section>
    </main>
  );
}