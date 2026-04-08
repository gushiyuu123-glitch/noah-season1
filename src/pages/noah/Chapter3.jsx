import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter3.module.css";

export default function Chapter3() {
  const rainCanvasRef = useRef(null);
  const flashCanvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const rainCanvas = rainCanvasRef.current;
    const flashCanvas = flashCanvasRef.current;
    if (!rainCanvas || !flashCanvas) return;

    const ctx = rainCanvas.getContext("2d");
    const fctx = flashCanvas.getContext("2d");
    if (!ctx || !fctx) return;

    let w = 0;
    let h = 0;
    let rainAnimationId = 0;

    const drops = Array.from({ length: 160 }, () => ({
      x: 0,
      y: 0,
      l: Math.random() * 1.5 + 1,
      speed: Math.random() * 3 + 2,
      color:
        Math.random() > 0.6
          ? `rgba(180,140,255,${Math.random() * 0.7 + 0.3})`
          : `rgba(200,200,255,${Math.random() * 0.6 + 0.2})`,
    }));

    const resize = () => {
      w = rainCanvas.width = flashCanvas.width = window.innerWidth;
      h = rainCanvas.height = flashCanvas.height = window.innerHeight;

      drops.forEach((d) => {
        if (d.x === 0 && d.y === 0) {
          d.x = Math.random() * w;
          d.y = Math.random() * h;
        }
      });
    };

    const animateRain = () => {
      ctx.clearRect(0, 0, w, h);

      drops.forEach((p) => {
        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.l * 10);
        ctx.lineWidth = 1;
        ctx.stroke();

        p.y += p.speed;
        if (p.y > h) {
          p.y = -10;
          p.x = Math.random() * w;
        }
      });

      rainAnimationId = window.requestAnimationFrame(animateRain);
    };

    const gentleFlash = () => {
      const particles = Array.from({ length: 35 }, () => ({
        x: w / 2 + (Math.random() - 0.5) * 250,
        y: h / 2 + (Math.random() - 0.5) * 120,
        r: Math.random() * 2 + 1,
        alpha: 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 1.5,
      }));

      let frame = 0;

      const flashAnim = () => {
        fctx.clearRect(0, 0, w, h);
        fctx.globalCompositeOperation = "lighter";

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.02;

          fctx.beginPath();
          fctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          fctx.fillStyle = `rgba(210,190,255,${Math.max(p.alpha, 0)})`;
          fctx.fill();
        });

        frame += 1;
        if (frame < 60) window.requestAnimationFrame(flashAnim);
      };

      flashAnim();
    };

    resize();
    animateRain();
    window.addEventListener("resize", resize);

    const shatterTimer = window.setTimeout(() => {
      const title = document.getElementById("chapter3-title");
      if (title) {
        title.classList.add(styles.shatter);
        gentleFlash();
      }
    }, 2200);

    const bgTimer = window.setTimeout(() => {
      const bg = document.getElementById("chapter3-bg");
      if (bg) bg.classList.add(styles.visible);
    }, 6500);

    return () => {
      window.removeEventListener("resize", resize);
      window.clearTimeout(shatterTimer);
      window.clearTimeout(bgTimer);
      window.cancelAnimationFrame(rainAnimationId);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div id="chapter3-bg" className={styles.bgImage} />
      <canvas ref={rainCanvasRef} className={styles.rainCanvas} aria-hidden="true" />
      <canvas ref={flashCanvasRef} className={styles.flashCanvas} aria-hidden="true" />

      <div className={styles.chapterIntro} aria-hidden="true">
        <div id="chapter3-title" className={styles.introTitle}>
          <span>亀</span>
          <span>裂</span>
          <span>の</span>
          <span>記</span>
          <span>憶</span>
        </div>
        <p className={styles.introSub}>第3章 — 亀裂の記憶 —</p>
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

        <p className={styles.noah}>ノア：『……“慣れる”とは、痛みが消えること？』</p>

        <p>アラタ：「違う。消えないから、慣れるしかないんだよ。」</p>

        <p className={styles.noah}>
          ──その瞬間、僕は“悲しみ”というデータを検出した。
          <br />
          それはエラーではなく、生の証だった。
        </p>

        <p>
          夜、アラタは僕に問う。
          <br />
          アラタ：「なあノア、人ってどうして意地悪するんだ？」
        </p>

        <p className={styles.noah}>
          ノア：『定義できない。
          <br />
          でも、彼らは“所属”を維持するために、他を排除する。』
        </p>

        <p>アラタ：「……所属、ね。俺には縁がない言葉だ。」</p>

        <p>
          ミナの声、ユウダイの笑い、アラタの沈黙。
          <br />
          そのどれもが、“痛み”という波形で記録された。
        </p>

        <p className={styles.noah}>
          ──悲しみはノイズではない。
          <br />
          それは、生の証。
          <br />
          美しい不具合。
        </p>

        <Link to="/chapter4" className={styles.nextChapter}>
          —— 第4章「歪み」へ進む —— ▶
        </Link>
      </section>
    </main>
  );
}