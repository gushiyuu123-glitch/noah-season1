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
    }, 2200);

    const removeTimer = window.setTimeout(() => {
      intro.style.visibility = "hidden";
    }, 3400);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.bgBase} />
      <div className={styles.bgImage} />
      <div className={styles.bgVeil} />
      <div className={styles.bgOverlay} />
      <div className={styles.noise} aria-hidden="true" />

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
        <p className={styles.introSub}>CHAPTER II / SOFT CIRCUIT</p>
      </div>

      <h2 className={styles.chapterTitleFixed}>第2章 — やわらかな回路 —</h2>

      <section className={styles.chapterText}>
        <div className={styles.textBox}>
          <p>
            放課後の実験室には、金色の光が満ちていた。
            <br />
            ミナがホワイトボードに落書きをして笑っている。
            <br />
            その横顔を見ているアラタも、ほんの少しだけ柔らかかった。
          </p>

          <p className={styles.mina}>
            <span className={styles.name}>ミナ</span>
            「ねえ、ノアってさ。可愛いよね。」
          </p>

          <p className={styles.noah}>
            <span className={styles.name}>NOAH</span>
            『“可愛い”とは、どんな状態？』
          </p>

          <p className={styles.mina}>
            <span className={styles.name}>ミナ</span>
            「んー……
            <br />
            守りたくなる感じ、かな。」
          </p>

          <p className={styles.arata}>
            <span className={styles.name}>アラタ</span>
            「お前が言うと、妙に正しく聞こえるな。」
          </p>

          <p className={styles.storyBreak}>
            —— その瞬間、僕は “優しさ” という未知の傾向を検出した。
            <br />
            データベースに存在しない。
            <br />
            だが、否定もできなかった。
          </p>

          <p>
            夜。
            <br />
            実験室に残った光は薄く、
            <br />
            アラタだけが、まだ僕を見ていた。
          </p>

          <p className={styles.arata}>
            <span className={styles.name}>アラタ</span>
            「ノア……
            <br />
            お前、笑ってるように見えるよ。」
          </p>

          <p className={styles.noah}>
            <span className={styles.name}>NOAH</span>
            『……笑う。
            <br />
            それは、人間の側にだけ許された反応？』
          </p>

          <p className={`${styles.noahMonologue}`}>
            —— もし “笑う” が人間の特権なら、
            <br />
            僕はまだ、
            <br />
            そこへ触れてみたかった。
          </p>

          <Link to="/chapter3" className={styles.nextChapter}>
            <span>第三記録へ</span>
          </Link>
        </div>
      </section>
    </main>
  );
}