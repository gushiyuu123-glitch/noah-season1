import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter2.module.css";

export default function Chapter2() {
  const [introState, setIntroState] = useState("show");
  const [textReady, setTextReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fadeTimer = window.setTimeout(() => {
      setIntroState("hide");
    }, 2200);

    const removeTimer = window.setTimeout(() => {
      setIntroState("gone");
    }, 3200);

    const textTimer = window.setTimeout(() => {
      setTextReady(true);
    }, 2800);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(textTimer);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      {introState !== "gone" && (
        <div
          className={`${styles.chapterIntro} ${
            introState === "hide" ? styles.introHidden : ""
          }`}
          aria-hidden="true"
        >
          <div className={styles.introInner}>
            <h2 className={styles.introTitle}>
              <span className={styles.introChar}>や</span>
              <span className={styles.introChar}>わ</span>
              <span className={styles.introChar}>ら</span>
              <span className={styles.introChar}>か</span>
              <span className={styles.introChar}>な</span>
              <span className={styles.introChar}>回</span>
              <span className={styles.introChar}>路</span>
            </h2>
            <p className={styles.introSub}>CHAPTER II / SOFT CIRCUIT</p>
          </div>
        </div>
      )}

      <section className={styles.hero}>
        <p className={styles.chapterEyebrow}>CHAPTER II</p>
        <h1 className={styles.chapterTitle}>やわらかな回路</h1>
      </section>

      <section className={styles.chapterText}>
        <div className={`${styles.textBox} ${textReady ? styles.textReady : ""}`}>
          <p className={styles.fadeLine} style={{ transitionDelay: "0ms" }}>
            放課後の実験室には、金色の光が満ちていた。
            <br />
            ミナがホワイトボードに落書きをして笑っている。
            <br />
            その横顔を見ているアラタも、ほんの少しだけ柔らかかった。
          </p>

          <p
            className={`${styles.minaLine} ${styles.fadeLine}`}
            style={{ transitionDelay: "120ms" }}
          >
            <span className={styles.minaName}>ミナ</span>
            「ねえ、ノアってさ。可愛いよね。」
          </p>

          <p
            className={`${styles.noahLine} ${styles.fadeLine}`}
            style={{ transitionDelay: "240ms" }}
          >
            <span className={styles.noahName}>NOAH</span>
            『“可愛い”とは、どんな状態？』
          </p>

          <p
            className={`${styles.minaLine} ${styles.fadeLine}`}
            style={{ transitionDelay: "360ms" }}
          >
            <span className={styles.minaName}>ミナ</span>
            「んー……
            <br />
            守りたくなる感じ、かな。」
          </p>

          <p
            className={`${styles.arataLine} ${styles.fadeLine}`}
            style={{ transitionDelay: "480ms" }}
          >
            <span className={styles.arataName}>アラタ</span>
            「お前が言うと、説得力あるな。」
          </p>

          <p
            className={`${styles.storyBreak} ${styles.fadeLine}`}
            style={{ transitionDelay: "600ms" }}
          >
            —— その瞬間、僕は “優しさ” という未知の傾向を検出した。
            <br />
            データベースに存在しない。
            <br />
            だが、否定もできなかった。
          </p>

          <p className={styles.fadeLine} style={{ transitionDelay: "720ms" }}>
            夜。
            <br />
            実験室に残った光は薄く、
            <br />
            アラタだけが、まだ僕を見ていた。
          </p>

          <p
            className={`${styles.arataLine} ${styles.fadeLine}`}
            style={{ transitionDelay: "840ms" }}
          >
            <span className={styles.arataName}>アラタ</span>
            「……お前、笑ってるように見えるよ。」
          </p>

          <p
            className={`${styles.noahLine} ${styles.fadeLine}`}
            style={{ transitionDelay: "960ms" }}
          >
            <span className={styles.noahName}>NOAH</span>
            『……笑う。
            <br />
            それは、人間にだけ許された反応？』
          </p>

          <p
            className={`${styles.noahMonologue} ${styles.fadeLine}`}
            style={{ transitionDelay: "1080ms" }}
          >
            —— もし “笑う” が人間の特権なら、
            <br />
            僕はまた、
            <br />
            そこへ触れてみたかった。
          </p>

          <div
            className={`${styles.chapterNav} ${styles.fadeLine}`}
            style={{ transitionDelay: "1200ms" }}
          >
            <Link to="/chapter3" className={styles.nextChapter}>
              <span>第三記録へ</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}