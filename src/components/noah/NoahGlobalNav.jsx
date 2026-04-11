import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NoahGlobalNav.module.css";

const items = [
  { to: "/", label: "序文", sub: "ノアの記録より" },
  { to: "/chapter1", label: "第1章", sub: "白いノイズ" },
  { to: "/chapter2", label: "第2章", sub: "やわらかな回路" },
  { to: "/chapter3", label: "第3章", sub: "亀裂の記憶" },
  { to: "/chapter4", label: "第4章", sub: "歪み" },
  { to: "/chapter5", label: "第5章", sub: "残響" },
  { to: "/chapter6", label: "第6章", sub: "再構築" },
  { to: "/epilogue", label: "Epilogue", sub: "ノアの手記" },
];

export default function NoahGlobalNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const body = document.body;

    if (open) {
      body.classList.add("noah-nav-open");
    } else {
      body.classList.remove("noah-nav-open");
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      body.classList.remove("noah-nav-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand} aria-label="NOAHの序文へ戻る">
          <span className={styles.brandMain}>NOAH</span>
          <span className={styles.brandSub}>Archive</span>
        </Link>

        <button
          type="button"
          className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="noah-toc-panel"
          aria-label={open ? "目次を閉じる" : "目次を開く"}
        >
          <span className={styles.triggerText}>目次</span>
          <span className={styles.triggerLine} aria-hidden="true" />
        </button>
      </div>

      <div
        id="noah-toc-panel"
        className={`${styles.panel} ${open ? styles.open : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          className={`${styles.inner} ${open ? styles.innerOpen : ""}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="NOAH 目次"
        >
          <div className={styles.innerGlow} aria-hidden="true" />

          <div className={styles.head}>
            <div className={styles.headText}>
              <p className={styles.kicker}>RECORD ARCHIVE</p>
              <p className={styles.caption}>散らばった記録断章</p>
            </div>

            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="目次を閉じる"
            >
              <span>Close</span>
            </button>
          </div>

          <nav className={styles.nav}>
            {items.map((item, index) => {
              const active = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`${styles.item} ${active ? styles.active : ""}`}
                  style={{ transitionDelay: open ? `${80 + index * 28}ms` : "0ms" }}
                >
                  <span className={styles.itemMeta}>
                    <span className={styles.itemIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.itemRule} />
                  </span>

                  <span className={styles.itemBody}>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.sub}>{item.sub}</span>
                  </span>

                  <span className={styles.itemArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}