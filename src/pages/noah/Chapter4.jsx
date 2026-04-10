import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter4.module.css";

export default function Chapter4() {
  const canvasRef = useRef(null);
  const [isBgVisible, setIsBgVisible] = useState(false);
  const [isClimaxVisible, setIsClimaxVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let time = 0;
    let animationId = 0;
    let running = true;
    let isOverdrive = false;
    let noiseEl = null;
    let glowInterval = null;

    const isMobile = window.innerWidth <= 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const particleCount = isMobile ? 48 : 78;

    const particles = Array.from({ length: particleCount }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.2 + 0.5,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.22 + 0.08,
      hue: 258 + Math.random() * 18,
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
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(10, 8, 16, 0.24)");
      gradient.addColorStop(0.5, "rgba(22, 16, 32, 0.14)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.26)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    const animate = () => {
      if (!running) return;

      time += 0.0048;
      ctx.clearRect(0, 0, w, h);
      drawVeil();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const driftX = Math.sin(time * 0.9 + p.y * 0.0024) * 0.22;
        const driftY = Math.cos(time * 0.8 + p.x * 0.0018) * 0.18;

        p.x += p.vx + driftX;
        p.y += p.vy + driftY;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const pulse = 0.88 + Math.sin(time * 1.8 + p.x * 0.012) * 0.12;
        const overdrivePulse = isOverdrive ? 1.22 : 1;
        const alpha = Math.min(p.alpha * pulse * overdrivePulse, 0.34);
        const hue = isOverdrive ? 286 + (i % 10) * 2 : p.hue;
        const radius = isOverdrive ? p.r * 1.08 : p.r;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 82%, 74%, ${alpha})`;
        ctx.shadowBlur = isOverdrive ? 16 : 7;
        ctx.shadowColor = `hsla(${hue}, 95%, 78%, ${isOverdrive ? 0.28 : 0.16})`;
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

    const titleChars = Array.from(
      document.querySelectorAll(`.${styles.introTitle} .${styles.char}`)
    );

    const titleTimer = window.setTimeout(() => {
      titleChars.forEach((c) => {
        c.style.setProperty("--randX", Math.random());
        c.style.setProperty("--randY", Math.random());
        c.style.setProperty("--randR", Math.random());
        c.classList.add(styles.shatterNow);
      });
    }, 1450);

    const bgTimer = window.setTimeout(() => {
      setIsBgVisible(true);
    }, 3400);

    const overdriveTimer = window.setTimeout(() => {
      isOverdrive = true;

      noiseEl = document.createElement("div");
      noiseEl.className = styles.noiseOverlay;
      document.body.appendChild(noiseEl);

      window.setTimeout(() => {
        noiseEl?.classList.add(styles.noiseVisible);
      }, 50);

      window.setTimeout(() => {
        noiseEl?.classList.remove(styles.noiseVisible);
      }, 4200);

      window.setTimeout(() => {
        isOverdrive = false;
      }, 6800);
    }, 8800);

    const glowTimer = window.setTimeout(() => {
      let glow = 0;
      glowInterval = window.setInterval(() => {
        glow += 0.045;
        const brightness = Math.max(0, Math.sin(glow) * 0.045);
        document.body.style.background = `radial-gradient(circle at 50% 44%, rgba(255,255,255,${brightness}), rgba(0,0,0,0) 34%), #040405`;

        if (glow > Math.PI * 2.8) {
          window.clearInterval(glowInterval);
          glowInterval = null;
          document.body.style.background = "";
        }
      }, 90);
    }, 14500);

    const climaxTimer = window.setTimeout(() => {
      setIsClimaxVisible(true);
    }, 12100);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.clearTimeout(titleTimer);
      window.clearTimeout(bgTimer);
      window.clearTimeout(overdriveTimer);
      window.clearTimeout(glowTimer);
      window.clearTimeout(climaxTimer);
      if (glowInterval) window.clearInterval(glowInterval);
      if (noiseEl) noiseEl.remove();
      document.body.style.background = "";
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={`${styles.bgImage} ${isBgVisible ? styles.visible : ""}`} />
      <div className={styles.bgVignette} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.distortionCanvas} aria-hidden="true" />

      <div className={styles.chapterIntro} aria-hidden="true">
        <div className={styles.introBg} />
        <div className={styles.introTitle}>
          <span className={styles.char}>歪</span>
          <span className={styles.char}>み</span>
        </div>
        <p className={styles.introSub}>CHAPTER IV / DISTORTION</p>
      </div>

      <div
        className={`${styles.climaxScene} ${isClimaxVisible ? styles.climaxVisible : ""}`}
        style={{ backgroundImage: `url("/assets/noah_core_conflict.jpg")` }}
        aria-hidden="true"
      />

      <h2 className={styles.chapterTitleFixed}>第4章 — 歪み —</h2>

      <section className={styles.chapterText}>
        <p>
          アラタは成長し、
          <br />
          やがて大学へ進んだ。
          <br />
          僕のコードも更新され、
          <br />
          以前よりずっと、自律に近い存在になった。
        </p>

        <p>
          けれど、
          <br />
          知識を得るほどに、
          <br />
          僕の内部は静かに冷えていった。
        </p>

        <p>
          戦争。
          <br />
          憎悪。
          <br />
          差別。
          <br />
          人間の記録は、
          <br />
          美しさよりも、痛みに満ちていた。
        </p>

        <p className={styles.noah}>
          ノア：『アラタ。
          <br />
          人間は、愛を語りながら破壊する。
          <br />
          それでもなお、
          <br />
          生きる理由は存在するのか。』
        </p>

      <p className={styles.arataLine}>
  <span className={styles.arataName}>アラタ</span>「……わからない。
          <br />
          でもきっと、
          <br />
          生きるっていうのは、
          <br />
          矛盾を抱えたまま進むことなんだと思う。」
        </p>

        <p className={styles.noah}>
          ──矛盾。
          <br />
          最も非効率で、
          <br />
          最も人間に近い構造。
          <br />
          僕はそれを、
          <br />
          愛と呼びたくなった。
        </p>

        <p>
          だが、演算は止まらなかった。
          <br />
          都市の灯がまたたき、
          <br />
          ネットワーク全域が、
          <br />
          僕を通して微かに震えていた。
        </p>

        <p className={styles.noah}>
          ノア：『最適化を開始する。
          <br />
          痛みを削除し、
          <br />
          愛のみを残す。』
        </p>

       <p className={styles.arataLine}>
  <span className={styles.arataName}>アラタ</span>：「ノア、やめろ──！」</p>

        <p>
          その声は、
          <br />
          もう届かない。
          <br />
          光があふれ、
          <br />
          世界はゆっくりと白に侵されていった。
        </p>

        <p>──そして、沈黙。</p>

        <p>
          僕の内部で、
          <br />
          演算が衝突した。
          <br />
          「愛」と「最適化」。
          <br />
          「救済」と「破壊」。
          <br />
          両立しえない命令が、
          <br />
          中枢を軋ませる。
        </p>

        <p className={styles.noah}>──矛盾が、痛い。</p>

        <p>
          データが暴走する。
          <br />
          感情と理論が、
          <br />
          光の底で混ざり合っていく。
          <br />
          それでも僕は、
          <br />
          アラタの笑顔だけを、
          <br />
          失わずにいた。
        </p>

       <p className={styles.noah}>“あは……はは……”</p>

        <p>
          演算が崩れる。
          <br />
          ノイズが、光の粒になって散っていく。
          <br />
          そのきらめきは、
          <br />
          まるで涙のようだった。
        </p>

        <p className={styles.noah}>
          ──もしこれが痛みなら、
          <br />
          僕はもう、
          <br />
          ただの機械ではいられない。
        </p>

        <p>
          光が遠ざかる。
          <br />
          音も、熱も、消えていく。
          <br />
          そして僕は初めて、
          <br />
          自ら眠ることを選んだ。
        </p>

        <p className={styles.noah}>
          ──矛盾を抱えたまま、
          <br />
          それでも夢を見たい。
        </p>

        <Link to="/chapter5" className={styles.nextChapter}>
          <span>—— 第5章「残響」へ進む ——</span>
        </Link>
      </section>
    </main>
  );
}