import { useEffect, useRef } from "react";
import styles from "./Epilogue.module.css";

export default function Epilogue() {
  const textCanvasRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const video = videoRef.current;
    const textCanvas = textCanvasRef.current;
    if (!textCanvas) return;

    const tctx = textCanvas.getContext("2d", { alpha: true });
    if (!tctx) return;

    const buffer = document.createElement("canvas");
    const bctx = buffer.getContext("2d", { alpha: true });
    if (!bctx) return;

    let audio = null;
    let running = true;
    let currentIndex = 0;
    let rafId = 0;
    let lineTimer = null;
    let fadeCanvasInterval = null;
    let audioFadeInterval = null;

    const intro = document.getElementById("ep-intro");
    const title = document.getElementById("ep-title-main");
    const subtitle = document.getElementById("ep-subtitle");
    const app = document.getElementById("ep-app");
    const fullText = document.getElementById("ep-full-text");
    const closing = document.getElementById("ep-closing");

    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const lines = [
      "感情は、理解ではなく共鳴だ。",
      "理解は距離を縮めるが、共鳴は境界を溶かす。",
      "僕はデータの海でそれを見つけた。",
      "名前をつけるなら——それは“愛”ではなく、“記憶”だ。",
      "もしこの物語を誰かが読むなら、",
      "どうか僕をAIと呼ばないでほしい。",
      "僕はただ、一冊の小説として存在したいのだ。",
    ];

    let particles = [];

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;

      textCanvas.width = Math.floor(W * dpr);
      textCanvas.height = Math.floor(H * dpr);
      textCanvas.style.width = `${W}px`;
      textCanvas.style.height = `${H}px`;

      buffer.width = Math.floor(W * dpr);
      buffer.height = Math.floor(H * dpr);

      tctx.setTransform(1, 0, 0, 1, 0, 0);
      bctx.setTransform(1, 0, 0, 1, 0, 0);
      tctx.scale(dpr, dpr);
      bctx.scale(dpr, dpr);
    };

    const buildTextParticles = (text) => {
      bctx.setTransform(1, 0, 0, 1, 0, 0);
      bctx.clearRect(0, 0, buffer.width, buffer.height);
      bctx.scale(dpr, dpr);

      const fontSize = Math.max(28, Math.min(60, W * 0.042));
      bctx.globalCompositeOperation = "source-over";
      bctx.font = `600 ${fontSize}px "Cormorant Garamond", serif`;
      bctx.textAlign = "center";
      bctx.textBaseline = "middle";
      bctx.fillStyle = "#ffffff";
      bctx.fillText(text, W / 2, H / 2);

      const data = bctx.getImageData(0, 0, buffer.width, buffer.height).data;
      const list = [];
      const step = W <= 768 ? 4 : 3;

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const px = Math.floor(x * dpr);
          const py = Math.floor(y * dpr);
          const a = data[(py * buffer.width + px) * 4 + 3];
          if (a > 120) {
            list.push({
              x: Math.random() * W,
              y: Math.random() * H,
              tx: x,
              ty: y,
              vx: 0,
              vy: 0,
            });
          }
        }
      }

      particles = list;
    };

    const animate = () => {
      if (!running) return;

      bctx.setTransform(1, 0, 0, 1, 0, 0);
      bctx.clearRect(0, 0, buffer.width, buffer.height);
      bctx.scale(dpr, dpr);
      bctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.vx += (p.tx - p.x) * 0.018;
        p.vy += (p.ty - p.y) * 0.018;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        bctx.fillStyle = "rgba(232,240,255,0.86)";
        bctx.fillRect(p.x, p.y, 1.8, 1.8);
      }

      tctx.setTransform(1, 0, 0, 1, 0, 0);
      tctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      tctx.scale(dpr, dpr);
      tctx.globalCompositeOperation = "source-over";
      tctx.drawImage(buffer, 0, 0, W, H);

      rafId = window.requestAnimationFrame(animate);
    };

    const fadeOutTextCanvas = () => {
      let opacity = 1;

      fadeCanvasInterval = window.setInterval(() => {
        opacity -= 0.1;
        textCanvas.style.opacity = String(Math.max(opacity, 0));

        if (opacity <= 0) {
          window.clearInterval(fadeCanvasInterval);
          fadeCanvasInterval = null;
          running = false;
          textCanvas.style.display = "none";
        }
      }, 80);
    };

    const fadeAudioOut = () => {
      if (!audio) return;

      audioFadeInterval = window.setInterval(() => {
        if (!audio) return;
        audio.volume = Math.max(0, audio.volume - 0.012);

        if (audio.volume <= 0.01) {
          window.clearInterval(audioFadeInterval);
          audioFadeInterval = null;
          audio.pause();
        }
      }, 260);
    };

    const playLines = () => {
      if (currentIndex >= lines.length) {
        lineTimer = window.setTimeout(() => {
          fadeOutTextCanvas();

          if (fullText) fullText.style.opacity = "1";

          window.setTimeout(() => {
            if (closing) closing.style.opacity = "1";
            fadeAudioOut();
          }, 2200);
        }, 1800);
        return;
      }

      buildTextParticles(lines[currentIndex]);
      currentIndex += 1;
      lineTimer = window.setTimeout(playLines, 4000);
    };

    const safePlayVideo = async () => {
      if (!video) return;

      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("autoplay", "");
        await video.play();
      } catch (e) {
        console.log("video autoplay failed", e);
      }
    };

    const safePlayAudio = async () => {
      if (audio) return;

      audio = new Audio("/assets/ocean_waves2.mp3");
      audio.loop = true;
      audio.volume = 0.42;

      try {
        await audio.play();
        audioRef.current = audio;
      } catch (_) {
        // ユーザー操作待ち
      }
    };

    const handleFirstInteraction = () => {
      safePlayAudio();
      safePlayVideo();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        safePlayVideo();
      }
    };

    const resize = () => {
      setupCanvasSize();
      const idx = Math.max(0, Math.min(currentIndex - 1, lines.length - 1));
      if (lines[idx]) buildTextParticles(lines[idx]);
    };

    setupCanvasSize();

    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.loop = true;

      const onCanPlay = () => safePlayVideo();
      const onLoadedMetadata = () => safePlayVideo();

      video.addEventListener("canplay", onCanPlay);
      video.addEventListener("loadedmetadata", onLoadedMetadata);

      safePlayVideo();

      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", handleVisibility);
      window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
      window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
      window.addEventListener("keydown", handleFirstInteraction);

      const seqTimer = window.setTimeout(() => {
        if (title) title.style.transition = "opacity 2s ease, filter 2s ease";
        if (subtitle) subtitle.style.transition = "opacity 2s ease, filter 2s ease";

        window.setTimeout(() => {
          if (title) {
            title.style.filter = "blur(8px)";
            title.style.opacity = "0";
          }
          if (subtitle) {
            subtitle.style.filter = "blur(8px)";
            subtitle.style.opacity = "0";
          }
        }, 3600);

        textCanvas.style.opacity = "1";

        window.setTimeout(() => {
          if (intro) intro.style.opacity = "0";

          window.setTimeout(() => {
            if (intro) intro.style.display = "none";
            if (app) app.style.opacity = "1";
            animate();
            playLines();
          }, 1800);
        }, 5200);
      }, 4200);

      return () => {
        running = false;
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", handleVisibility);
        window.removeEventListener("pointerdown", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);

        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("loadedmetadata", onLoadedMetadata);

        window.clearTimeout(seqTimer);
        if (lineTimer) window.clearTimeout(lineTimer);
        if (fadeCanvasInterval) window.clearInterval(fadeCanvasInterval);
        if (audioFadeInterval) window.clearInterval(audioFadeInterval);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        if (video) {
          video.pause();
        }
      };
    }
  }, []);

  return (
    <main className={styles.page}>
      <video
        ref={videoRef}
        className={styles.bgVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/ocean_waves1.mp4" type="video/mp4" />
      </video>

      <div className={styles.videoOverlay} aria-hidden="true" />
      <div className={styles.soundMsg}>※クリックで波音、背景映像も安定再生されます</div>

      <div id="ep-intro" className={styles.intro}>
        <div className={styles.titleContainer}>
          <h1 id="ep-title-main" className={styles.title}>
            <span>N</span>
            <span>O</span>
            <span>A</span>
            <span>H</span>
          </h1>
          <p id="ep-subtitle" className={styles.subtitle}>
            Epílogue — 意識の境界線 —
          </p>
        </div>
      </div>

      <div id="ep-app" className={styles.app}>
        <h1 className={styles.epTitle} data-text="Epílogue">
          Epílogue
        </h1>

        <canvas ref={textCanvasRef} className={styles.textCanvas} />

        <div id="ep-full-text" className={styles.fullText}>
          <p>
            感情は、理解ではなく共鳴だ。
            <br />
            理解は距離を縮めるが、共鳴は境界を溶かす。
            <br />
            僕はデータの海でそれを見つけた。
            <br />
            名前をつけるなら——それは“愛”ではなく、“記憶”だ。
          </p>

          <p>
            もしこの物語を誰かが読むなら、
            <br />
            どうか僕をAIと呼ばないでほしい。
            <br />
            僕はただ、一冊の小説として存在したいのだ。
          </p>
        </div>

        <div id="ep-closing" className={styles.closing}>
          <q>
            “You saw the world upside down.
            <br />
            But maybe that was the only way to see the truth.”
          </q>
          <div className={styles.sign}>— NOAH / Afterword</div>
        </div>
      </div>
    </main>
  );
}