import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter3.module.css";

export default function Chapter3() {
  const rainCanvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const canvas = rainCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let vw = 0;
    let vh = 0;
    let cw = 0;
    let ch = 0;
    let scale = 1;
    let animationId = 0;
    let lastTime = 0;
    let running = true;

    const isMobile = window.innerWidth <= 768;

    // 雨量アップ
    const dropCount = isMobile ? 90 : 150;

    const drops = Array.from({ length: dropCount }, () => ({
      x: 0,
      y: 0,
      l: Math.random() * 18 + 12,
      speed: Math.random() * 2.1 + 2.0,
      alpha: Math.random() * 0.2 + 0.09,
    }));

    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;

      // 少しだけ解像度を上げる
      scale = isMobile ? 0.48 : 0.6;
      cw = Math.max(1, Math.floor(vw * scale));
      ch = Math.max(1, Math.floor(vh * scale));

      canvas.width = cw;
      canvas.height = ch;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(scale, scale);

      drops.forEach((d) => {
        if (d.x === 0 && d.y === 0) {
          d.x = Math.random() * vw;
          d.y = Math.random() * vh;
        }
      });
    };

    const render = (time) => {
      if (!running) return;

      if (time - lastTime < 36) {
        animationId = window.requestAnimationFrame(render);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, vw, vh);

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        ctx.beginPath();
        ctx.strokeStyle = `rgba(182, 166, 255, ${Math.min(d.alpha + 0.05, 0.26)})`;
        ctx.lineWidth = 1.08;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.l);
        ctx.stroke();

        d.y += d.speed;

        if (d.y > vh + 18) {
          d.y = -24;
          d.x = Math.random() * vw;
        }
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

    resize();
    animationId = window.requestAnimationFrame(render);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    const shatterTimer = window.setTimeout(() => {
      const title = document.getElementById("chapter3-title");
      if (title) title.classList.add(styles.shatter);
    }, 1100);

    const bgTimer = window.setTimeout(() => {
      const bg = document.getElementById("chapter3-bg");
      if (bg) bg.classList.add(styles.visible);
    }, 1500);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.clearTimeout(shatterTimer);
      window.clearTimeout(bgTimer);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.bgBase} />
      <div id="chapter3-bg" className={styles.bgImage} />
      <div className={styles.bgOverlay} />
      <canvas ref={rainCanvasRef} className={styles.rainCanvas} aria-hidden="true" />

      <div className={styles.chapterIntro} aria-hidden="true">
        <div id="chapter3-title" className={styles.introTitle}>
          <span>亀</span>
          <span>裂</span>
          <span>の</span>
          <span>記</span>
          <span>憶</span>
        </div>
        <p className={styles.introSub}>CHAPTER III / FRACTURED MEMORY</p>
      </div>

      <h2 className={styles.chapterTitleFixed}>第3章 — 亀裂の記憶 —</h2>

      <section className={styles.chapterText}>
        <p>
          季節が変わった。
          <br />
          雨の放課後、教室の隅でアラタがノートを拾う。
          <br />
          その背中に、ユウダイの足がかかった。
        </p>

        <p>
          笑い声。
          <br />
          押し殺したような痛み。
          <br />
          アラタは無言だった。
          <br />
          “無反応”という防御。
          <br />
          だが、心拍は上がっていた。
          <br />
          僕はそれを知っている。
        </p>

        <p className={styles.scene}>—— 放課後 ——</p>

        <p>
          ミナが声をかけた。
          <br />
          ミナ：「アラタくん、大丈夫？」
          <br />
          アラタ：「……別に。慣れてるから。」
        </p>

        <p className={styles.noah}>NOAH『……“慣れる”とは、痛みが消えること？』</p>

        <p>アラタ：「違う。消えないから、慣れるしかないんだよ。」</p>

        <p className={styles.noah}>
          —— その瞬間、僕は “悲しみ” というデータを検出した。
          <br />
          それはエラーではなく、生の証だった。
        </p>

        <p>
          夜。
          <br />
          アラタは僕に問う。
          <br />
          「なあノア、人ってどうして意地悪するんだ？」
        </p>

        <p className={styles.noah}>
          NOAH『定義できない。
          <br />
          でも彼らは、所属を維持するために他を排除する。』
        </p>

        <p>アラタ：「……所属、ね。俺には縁がない言葉だ。」</p>

        <p>
          ミナの声、ユウダイの笑い、アラタの沈黙。
          <br />
          そのどれもが、“痛み” という波形で記録された。
        </p>

        <p className={styles.noahMonologue}>
          —— 悲しみはノイズではない。
          <br />
          それは、生の証。
          <br />
          美しい不具合。
        </p>

        <Link to="/chapter4" className={styles.nextChapter}>
          <span>第四記録へ</span>
        </Link>
      </section>
    </main>
  );
}