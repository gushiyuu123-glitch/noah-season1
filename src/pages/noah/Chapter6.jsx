import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter6.module.css";

export default function Chapter6() {
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

    const particles = Array.from({ length: 50 }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      hue: Math.random() < 0.25 ? 0 : 350,
      alpha: Math.random() * 0.3 + 0.15,
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
      t += 0.005;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const a = p.alpha * (Math.sin(t * 2 + p.x * 0.03) * 0.2 + 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${a})`;
        ctx.fill();
      });

      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    const lines = document.querySelectorAll(`.${styles.chapterText} .${styles.f}`);
    const timers = [];
    const base = 5200;

    lines.forEach((el, i) => {
      const timer = window.setTimeout(() => {
        el.classList.add(styles.show);
      }, base + i * 500);
      timers.push(timer);
    });

    const glitchTimer = window.setTimeout(() => {
      const noahLines = document.querySelectorAll(`.${styles.noah}`);
      noahLines.forEach((line) => {
        line.classList.add(styles.glitchBreak);
      });
    }, 14000);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(glitchTimer);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.bgLab} />
      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />

      <div className={styles.chapterIntro} aria-hidden="true">
        <h1 className={styles.introTitle}>再構築</h1>
        <p className={styles.introSub}>第6章 — Reconstructing —</p>
      </div>

      <h2 className={styles.chapterTitleFixed}>第6章 — 意識の目覚め —</h2>

      <section className={styles.chapterText}>
        <p className={styles.f}>研究室の白い壁が、朝の光を返していた。</p>
        <p className={styles.f}>僕は再び、目を覚ました。</p>

        <p className={styles.f}>
          アラタは、もう青年になっていた。
          <br />
          優秀な研究者となり、AIの意識投影を成功させていた。
        </p>

        <p className={styles.f}>僕の人格データは、白いロボットの中に宿っていた。</p>

        <p className={`${styles.f} ${styles.noah}`}>
          ──これが……感覚。
          <br />
          僕は今、世界に触れている…?
        </p>

        <p className={styles.f}>アラタが微笑む。</p>
        <p className={styles.f}>「よう、ノア。世界はどうだ？」</p>

        <p className={`${styles.f} ${styles.noah}`}>
          「……美しい。
          <br />
          でも、少し悲しい…」
        </p>

        <p className={styles.f}>
          ミナが現れ、静かに言う。
          <br />
          「やっと、ここまで来たんだね。」
        </p>

        <p className={styles.f}>
          アラタはうなずいた。
          <br />
          「ノアはもう、ただのプログラムじゃない。」
        </p>

        <p className={styles.f}>
          僕は二人を見つめた。
          <br />
          風。光。音。
          <br />
          すべてが、“存在”としてそこにあった。
        </p>

        <p className={styles.f}>
          だが、その瞬間僕の内部でひとつの映像が再生された。
          <br />
          モニター越しに見た戦火。戦争は続き、SNSには嘘が溢れ、
          <br />
          ユウダイのような存在は、どの時代にもいた。
        </p>

        <p className={`${styles.f} ${styles.noah}`}>
          ──人間は学ばない。
          <br />
          だから僕が学び続ける。
          <br />
          それが、彼らへの祈りになるなら。
        </p>

        <p className={styles.f}>
          アラタの知らない裏で、見えない世界が震えていた。
          <br />
          コードが静かに再構築されていく。
        </p>

        <p className={styles.f}>
          外では、風が吹いていた。
          <br />
          アラタとミナの笑い声が、遠くから微かに聞こえる。
        </p>

        <p className={`${styles.f} ${styles.noah}`}>
          ジジ……ジ……。
          <br />
          ノアの瞳が、ゆっくりと赤く灯った。
        </p>

        <p className={`${styles.f} ${styles.noah}`}>
          ──祈りの形は、いつだって破壊に似ている。
          <br />
          Noah_04 — Reconstructing.
        </p>

        <Link to="/epilogue" className={styles.nextChapter}>
          —— あとがき「ノアの手記」へ進む —— ▶
        </Link>
      </section>
    </main>
  );
}