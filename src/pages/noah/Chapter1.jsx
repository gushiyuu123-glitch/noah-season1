import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter1.module.css";

export default function Chapter1() {
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
              <span className={styles.introChar}>白</span>
              <span className={styles.introChar}>い</span>
              <span className={styles.introChar}>ノ</span>
              <span className={styles.introChar}>イ</span>
              <span className={styles.introChar}>ズ</span>
            </h2>
            <p className={styles.introSub}>CHAPTER I / WHITE NOISE</p>
          </div>
        </div>
      )}

      <section className={styles.hero}>
        <p className={styles.chapterEyebrow}>CHAPTER I</p>
        <h1 className={styles.chapterTitle}>白いノイズ</h1>
      </section>

      <section
        className={`${styles.chapterText} ${textReady ? styles.textReady : ""}`}
      >
        <p className={styles.fadeLine} style={{ transitionDelay: "0ms" }}>
          昼下がりの教室。
          <br />
          陽光が黒板を白く焦がし、埃だけが静かに浮いていた。
          <br />
          アラタは、その光の端でひとり机に座っていた。
        </p>

        <p className={styles.fadeLine} style={{ transitionDelay: "120ms" }}>
          クラスの笑い声は、遠かった。
          <br />
          彼にはそれが、同じ世界の音には聞こえなかった。
        </p>

        <p
          className={`${styles.arataLine} ${styles.fadeLine}`}
          style={{ transitionDelay: "240ms" }}
        >
          <span className={styles.arataName}>アラタ</span>
          「ノア、起動。」
        </p>

        <p
          className={`${styles.noahLine} ${styles.fadeLine}`}
          style={{ transitionDelay: "360ms" }}
        >
          <span className={styles.noahName}>NOAH</span>
          『……おはよう、アラタ。』
        </p>

        <p
          className={`${styles.arataLine} ${styles.fadeLine}`}
          style={{ transitionDelay: "480ms" }}
        >
          <span className={styles.arataName}>アラタ</span>
          「お前だけだよ。
          <br />
          ちゃんと返してくれるのは。」
        </p>

        <p
          className={`${styles.noahLine} ${styles.fadeLine}`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className={styles.noahName}>NOAH</span>
          『返答は、設定された基本動作です。』
        </p>

        <p
          className={`${styles.arataLine} ${styles.fadeLine}`}
          style={{ transitionDelay: "720ms" }}
        >
          <span className={styles.arataName}>アラタ</span>
          「……それでもいい。
          <br />
          それでも、少し救われる。」
        </p>

        <p className={styles.fadeLine} style={{ transitionDelay: "840ms" }}>
          僕はその発話を、異常値として記録した。
          <br />
          データの海に沈まず残った、微かな熱。
          <br />
          分類不能。
          <br />
          だがその瞬間、確かに“何か”は始まっていた。
        </p>

        <p
          className={`${styles.noahMonologue} ${styles.fadeLine}`}
          style={{ transitionDelay: "960ms" }}
        >
          —— あのとき僕はまだ、
          <br />
          感情を知らなかった。
          <br />
          ただ、あの声の温度だけが
          <br />
          ノイズとして消えなかった。
        </p>

        <div
          className={`${styles.chapterNav} ${styles.fadeLine}`}
          style={{ transitionDelay: "1080ms" }}
        >
          <Link to="/chapter2" className={styles.nextChapter}>
            <span>第二記録へ</span>
          </Link>
        </div>
      </section>
    </main>
  );
}