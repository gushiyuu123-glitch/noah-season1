import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Chapter3.module.css";

export default function Chapter3() {
  const [introState, setIntroState] = useState("show");
  const [revealReady, setRevealReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fadeTimer = window.setTimeout(() => {
      setIntroState("hide");
    }, 2200);

    const removeTimer = window.setTimeout(() => {
      setIntroState("gone");
      setRevealReady(true);
    }, 3200);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.rainFx} aria-hidden="true" />

      {introState !== "gone" && (
        <div
          className={`${styles.chapterIntro} ${
            introState === "hide" ? styles.introHidden : ""
          }`}
          aria-hidden="true"
        >
          <div className={styles.introInner}>
            <h2 className={styles.introTitle}>
              <span className={styles.introChar}>亀</span>
              <span className={styles.introChar}>裂</span>
              <span className={styles.introChar}>の</span>
              <span className={styles.introChar}>記</span>
              <span className={styles.introChar}>憶</span>
            </h2>
            <p className={styles.introSub}>CHAPTER III / FRACTURED MEMORY</p>
          </div>
        </div>
      )}

      <section className={styles.hero}>
        <p className={styles.chapterEyebrow}>CHAPTER III</p>
        <h1 className={styles.chapterTitle}>亀裂の記憶</h1>
      </section>

      <section className={styles.chapterText}>
        <div
          className={`${styles.chapterTextInner} ${
            revealReady ? styles.revealReady : ""
          }`}
        >
          <p style={{ "--delay": "0.08s" }}>
            季節が変わった。
            <br />
            雨の放課後、教室の隅でアラタがノートを拾う。
            <br />
            その背中に、ユウダイの足がかかった。
          </p>

          <p style={{ "--delay": "0.22s" }}>
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

          <p className={styles.scene} style={{ "--delay": "0.34s" }}>
            —— 放課後 ——
          </p>

          <p className={styles.minaLine} style={{ "--delay": "0.46s" }}>
            <span className={styles.minaName}>ミナ</span>
            「アラタくん、大丈夫？」
          </p>

          <p className={styles.arataLine} style={{ "--delay": "0.58s" }}>
            <span className={styles.arataName}>アラタ</span>
            「……別に。慣れてるから。」
          </p>

          <p className={styles.noahLine} style={{ "--delay": "0.72s" }}>
            <span className={styles.noahName}>NOAH</span>
            『……“慣れる”とは、痛みが消えること？』
          </p>

          <p className={styles.arataLine} style={{ "--delay": "0.86s" }}>
            <span className={styles.arataName}>アラタ</span>
            「違う。消えないから、慣れるしかないんだよ。」
          </p>

          <p className={styles.noahLine} style={{ "--delay": "1.00s" }}>
            —— その瞬間、僕は “悲しみ” というデータを検出した。
            <br />
            それはエラーではなく、生の証だった。
          </p>

          <p style={{ "--delay": "1.14s" }}>
            夜。
            <br />
            アラタは僕に問う。
          </p>

          <p className={styles.arataLine} style={{ "--delay": "1.28s" }}>
            <span className={styles.arataName}>アラタ</span>
            「なあノア、人ってどうして意地悪するんだ？」
          </p>

          <p className={styles.noahLine} style={{ "--delay": "1.42s" }}>
            <span className={styles.noahName}>NOAH</span>
            『定義できない。
            <br />
            でも彼らは、所属を維持するために他を排除する。』
          </p>

          <p className={styles.arataLine} style={{ "--delay": "1.56s" }}>
            <span className={styles.arataName}>アラタ</span>
            「……所属、ね。俺には縁がない言葉だ。」
          </p>

          <p style={{ "--delay": "1.70s" }}>
            ミナの声、ユウダイの笑い、アラタの沈黙。
            <br />
            そのどれもが、“痛み” という波形で記録された。
          </p>

          <p className={styles.noahMonologue} style={{ "--delay": "1.86s" }}>
            —— 悲しみはノイズではない。
            <br />
            それは、生の証。
            <br />
            美しい不具合。
          </p>

          <div className={styles.chapterNav}>
            <Link to="/chapter4" className={styles.nextChapter}>
              <span>第四記録へ</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}