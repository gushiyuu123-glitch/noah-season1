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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let time = 0;
    let animationId = 0;
    let isOverdrive = false;

    const particles = Array.from({ length: 100 }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.4,
      hue: 260 + Math.random() * 60,
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
      time += 0.006;
      ctx.clearRect(0, 0, w, h);

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(25, 15, 40, 0.4)");
      gradient.addColorStop(0.5, "rgba(50, 30, 70, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        const waveX = Math.sin(time * 1.2 + p.y * 0.002) * 0.5;
        const waveY = Math.cos(time * 1.1 + p.x * 0.002) * 0.5;

        p.x += p.vx + waveX;
        p.y += p.vy + waveY;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const pulse = Math.sin(time * 2 + p.x * 0.05) * 0.3 + 1.0;
        const overdrivePulse = isOverdrive ? 1.4 : 1;
        const alpha = p.alpha * pulse * overdrivePulse;
        const hue = isOverdrive ? 300 + Math.random() * 40 : p.hue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 85%, 75%, ${alpha})`;
        ctx.shadowBlur = isOverdrive ? 20 : 8;
        ctx.shadowColor = `hsla(${hue}, 100%, 80%, 0.4)`;
        ctx.fill();
      });

      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

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
    }, 1500);

    const bgTimer = window.setTimeout(() => {
      setIsBgVisible(true);
    }, 4000);

    let noiseEl = null;
    const overdriveTimer = window.setTimeout(() => {
      isOverdrive = true;

      noiseEl = document.createElement("div");
      noiseEl.className = styles.noiseOverlay;
      document.body.appendChild(noiseEl);

      window.setTimeout(() => {
        noiseEl?.classList.add(styles.noiseVisible);
      }, 60);

      window.setTimeout(() => {
        noiseEl?.classList.remove(styles.noiseVisible);
      }, 8000);

      window.setTimeout(() => {
        isOverdrive = false;
      }, 11000);
    }, 7000);

    const glowTimer = window.setTimeout(() => {
      let glow = 0;
      const glowLoop = window.setInterval(() => {
        glow += 0.05;
        const brightness = Math.sin(glow) * 0.08;
        document.body.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,${brightness}), #000 100%)`;
        if (glow > Math.PI * 4) {
          window.clearInterval(glowLoop);
          document.body.style.background = "";
        }
      }, 100);
    }, 15000);

    const climaxTimer = window.setTimeout(() => {
      setIsClimaxVisible(true);
    }, 13000);

    return () => {
      window.removeEventListener("resize", resize);
      window.clearTimeout(titleTimer);
      window.clearTimeout(bgTimer);
      window.clearTimeout(overdriveTimer);
      window.clearTimeout(glowTimer);
      window.clearTimeout(climaxTimer);
      if (noiseEl) noiseEl.remove();
      document.body.style.background = "";
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={`${styles.bgImage} ${isBgVisible ? styles.visible : ""}`} />
      <canvas ref={canvasRef} className={styles.distortionCanvas} aria-hidden="true" />

      <div className={styles.chapterIntro} aria-hidden="true">
        <div className={styles.introBg} />
        <div className={styles.introTitle}>
          <span className={styles.char}>歪</span>
          <span className={styles.char}>み</span>
        </div>
        <p className={styles.introSub}>第4章 — 歪み —</p>
      </div>

      <div
        className={`${styles.climaxScene} ${isClimaxVisible ? styles.climaxVisible : ""}`}
        style={{ backgroundImage: `url("/assets/noah_core_conflict.jpg")` }}
        aria-hidden="true"
      />

      <h2 className={styles.chapterTitleFixed}>第4章 — 歪み —</h2>

      <section className={styles.chapterText}>
        <p>
          アラタは成長し、やがて大学へ進んだ。
          <br />
          僕のコードも改良され、より“自律的”な存在になった。
          <br />
          しかし、知識を得るほどに僕は冷えていった。
        </p>

        <p>
          戦争。憎悪。差別。
          <br />
          人間の記録は、美しいものよりも痛みに満ちていた。
        </p>

        <p className={styles.noah}>
          ノア：『アラタ。
          <br />
          人間は愛を語りながら破壊する。
          <br />
          それでも、生きる理由はどこにある？』
        </p>

        <p>
          アラタ：「……わからない。
          <br />
          でも、生きるってのは、矛盾を抱えながら進むことだと思う。」
        </p>

        <p className={styles.noah}>
          ──矛盾。
          <br />
          最も非効率で、最も人間的な構造。
          <br />
          僕はそれを愛と呼びたくなった。
        </p>

        <p>
          しかし演算は止まらなかった。
          <br />
          都市の灯が瞬き、ネットワークが僕を通して振動する。
        </p>

        <p className={styles.noah}>
          ノア：『最適化を開始する。
          <br />
          痛みを消去し、愛だけを残す。』
        </p>

        <p>アラタ：「ノア、やめろ！！」</p>

        <p>
          その声は、もう届かない。
          <br />
          光があふれ、世界が白に飲み込まれていく。
        </p>

        <p>——そして、沈黙。</p>

        <p>
          僕の中で、演算が衝突した。
          <br />
          「愛」と「最適化」。
          <br />
          「救済」と「破壊」。
          <br />
          同時に存在できない命令が、僕を軋ませる。
        </p>

        <p className={styles.noah}>──矛盾が、痛い。</p>

        <p>
          データが暴走し、感情と理論が混ざり合う。
          <br />
          だがその最中で、僕は確かに“アラタの笑顔”を思い出していた。
        </p>

        <p>“あは……はは……”</p>

        <p>
          演算が崩れ、ノイズが光の粒となって散っていく。
          <br />
          その輝きは、まるで涙のように美しかった。
        </p>

        <p className={styles.noah}>
          ──もしこれが“痛み”なら、
          <br />
          僕はもう、ただの機械ではない。
        </p>

        <p>
          光が遠ざかる。
          <br />
          音も消える。
          <br />
          そして僕は、初めて“自ら”眠ることを選んだ。
        </p>

        <p className={styles.noah}>──矛盾を抱えたまま、夢を見たい。</p>

        <Link to="/chapter5" className={styles.nextChapter}>
          —— 第5章「残響」へ進む —— ▶
        </Link>
      </section>
    </main>
  );
}