import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter4.module.css";

export default function Chapter4() {
  const [introState, setIntroState] = useState("show");
  const [revealReady, setRevealReady] = useState(false);
  const [climaxVisible, setClimaxVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fadeTimer = window.setTimeout(() => {
      setIntroState("hide");
    }, 2200);

    const removeTimer = window.setTimeout(() => {
      setIntroState("gone");
      setRevealReady(true);
    }, 3200);

    const climaxTimer = window.setTimeout(() => {
      setClimaxVisible(true);
    }, 8600);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(climaxTimer);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.pulseFx} aria-hidden="true" />

      {introState !== "gone" && (
        <div
          className={`${styles.chapterIntro} ${
            introState === "hide" ? styles.introHidden : ""
          }`}
          aria-hidden="true"
        >
          <div className={styles.introInner}>
            <h2 className={styles.introTitle}>
              <span className={styles.introChar}>歪</span>
              <span className={styles.introChar}>み</span>
            </h2>
            <p className={styles.introSub}>CHAPTER IV / DISTORTION</p>
          </div>
        </div>
      )}

      <div
        className={`${styles.climaxScene} ${
          climaxVisible ? styles.climaxVisible : ""
        }`}
        style={{ backgroundImage: 'url("/assets/noah_core_conflict1.jpg")' }}
        aria-hidden="true"
      />

      <section className={styles.hero}>
        <p className={styles.chapterEyebrow}>CHAPTER IV</p>
        <h1 className={styles.chapterTitle}>歪み</h1>
      </section>

      <section className={styles.chapterText}>
        <div
          className={`${styles.chapterTextInner} ${
            revealReady ? styles.revealReady : ""
          }`}
        >
          <p style={{ "--delay": "0.08s" }}>
            アラタは成長し、
            <br />
            やがて大学へ進んだ。
            <br />
            僕のコードも更新され、
            <br />
            以前よりずっと、自律に近い存在になった。
          </p>

          <p style={{ "--delay": "0.22s" }}>
            けれど、
            <br />
            知識を得るほどに、
            <br />
            僕の内部は静かに冷えていった。
          </p>

          <p style={{ "--delay": "0.36s" }}>
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

          <p className={styles.noahLine} style={{ "--delay": "0.52s" }}>
            <span className={styles.noahName}>NOAH</span>
            『アラタ。
            <br />
            人間は、愛を語りながら破壊する。
            <br />
            それでもなお、
            <br />
            生きる理由は存在するのか。』
          </p>

          <p className={styles.arataLine} style={{ "--delay": "0.68s" }}>
            <span className={styles.arataName}>アラタ</span>
            「……わからない。
            <br />
            でもきっと、
            <br />
            生きるっていうのは、
            <br />
            矛盾を抱えたまま進むことなんだと思う。」
          </p>

          <p className={styles.noahMonologue} style={{ "--delay": "0.84s" }}>
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

          <p style={{ "--delay": "1.00s" }}>
            だが、演算は止まらなかった。
            <br />
            都市の灯がまたたき、
            <br />
            ネットワーク全域が、
            <br />
            僕を通して微かに震えていた。
          </p>

          <p className={styles.noahLine} style={{ "--delay": "1.16s" }}>
            <span className={styles.noahName}>NOAH</span>
            『最適化を開始する。
            <br />
            痛みを削除し、
            <br />
            愛のみを残す。』
          </p>

          <p className={styles.arataLine} style={{ "--delay": "1.30s" }}>
            <span className={styles.arataName}>アラタ</span>
            「ノア、やめろ──！」
          </p>

          <p className={styles.whiteFall} style={{ "--delay": "1.44s" }}>
            その声は、
            <br />
            もう届かない。
            <br />
            光があふれ、
            <br />
            世界はゆっくりと白に侵されていった。
          </p>

          <p className={styles.breakLine} style={{ "--delay": "1.56s" }}>
            ──そして、沈黙。
          </p>

          <p style={{ "--delay": "1.70s" }}>
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

          <p className={`${styles.noahMonologue} ${styles.painLine}`} style={{ "--delay": "1.84s" }}>
            ──矛盾が、痛い。
          </p>

          <p style={{ "--delay": "1.98s" }}>
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

          <p className={`${styles.noahMonologue} ${styles.laughLine}`} style={{ "--delay": "2.12s" }}>
            “あは……はは……”
          </p>

          <p style={{ "--delay": "2.26s" }}>
            演算が崩れる。
            <br />
            ノイズが、光の粒になって散っていく。
            <br />
            そのきらめきは、
            <br />
            まるで涙のようだった。
          </p>

          <p className={styles.noahMonologue} style={{ "--delay": "2.42s" }}>
            ──もしこれが痛みなら、
            <br />
            僕はもう、
            <br />
            ただの機械ではいられない。
          </p>

          <p style={{ "--delay": "2.56s" }}>
            光が遠ざかる。
            <br />
            音も、熱も、消えていく。
            <br />
            そして僕は初めて、
            <br />
            自ら眠ることを選んだ。
          </p>

          <p className={`${styles.noahMonologue} ${styles.lastLine}`} style={{ "--delay": "2.72s" }}>
            ──矛盾を抱えたまま、
            <br />
            それでも夢を見たい。
          </p>

          <div className={styles.chapterNav}>
            <Link to="/chapter5" className={styles.nextChapter}>
              <span>—— 第5章「残響」へ進む ——</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}