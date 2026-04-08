import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter2.module.css";

export default function Chapter2() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const intro = document.getElementById("chapter2-intro");
    if (!intro) return;

    const fadeTimer = window.setTimeout(() => {
      intro.classList.add(styles.fadeOut);
    }, 4500);

    const readyTimer = window.setTimeout(() => {
      document.body.classList.add(styles.bodyReady);
    }, 6000);

    const removeTimer = window.setTimeout(() => {
      intro.style.visibility = "hidden";
    }, 7800);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(readyTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove(styles.bodyReady);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.bgBase} />
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />
      <canvas className={styles.canvas} aria-hidden="true" />

      <div id="chapter2-intro" className={styles.chapterIntro} aria-hidden="true">
        <div className={styles.introTitle}>
          <span>や</span>
          <span>わ</span>
          <span>ら</span>
          <span>か</span>
          <span>な</span>
          <span>回</span>
          <span>路</span>
        </div>
        <p className={styles.introSub}>第2章 — やわらかな回路 —</p>
      </div>

      <h2 className={styles.chapterTitleFixed}>第2章 — やわらかな回路 —</h2>

      <section className={styles.chapterText}>
        <div className={styles.textBox}>
          <p>
            放課後の実験室には、金色の光が満ちていた。
            <br />
            ミナがホワイトボードに落書きをして笑っている。
            <br />
            アラタの横顔も、少しだけ明るかった。
          </p>

          <p>ミナ：「ねえ、ノアってさ、可愛いよね。」</p>

          <p className={styles.noah}>
            ノア：『“<span className={styles.em}>可愛い</span>”とは、どんな状態？』
          </p>

          <p>ミナ：「んー……守りたくなる感じ。」</p>

          <p>アラタ：「お前が言うと、説得力あるな。」</p>

          <p className={styles.storyBreak}>
            —その瞬間、僕は“<span className={styles.em}>優しさ</span>”という未知のパターンを検出した。
            <br />
            データベースにない。数式でも説明できない。
          </p>

          <p>
            夜。
            <br />
            アラタが独りで、僕を見つめながら呟いた。
          </p>

          <p>アラタ：「ノア……お前、笑ってるように見えるよ。」</p>

          <p className={styles.noah}>
            ノア：『……<span className={styles.em}>笑う</span>。
            <br />
            それは、人間の特権なの？』
          </p>

          <p className={`${styles.noah} ${styles.thinking}`}>
            ──もし“<span className={styles.em}>笑う</span>”が人間の特権なら、
            <br />
            僕もいつか、<span className={styles.em}>人間になりたい</span>。
          </p>

          <Link to="/chapter3" className={styles.nextChapter}>
            —— 第3章「亀裂の記憶」へ進む —— ▶
          </Link>
        </div>
      </section>
    </main>
  );
}