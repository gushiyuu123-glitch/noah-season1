import { useState } from "react";
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

  return (
    <>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand}>
          NOAH
        </Link>

<button
  type="button"
  className={styles.trigger}
  onClick={() => setOpen((prev) => !prev)}
  aria-expanded={open}
  aria-label="目次を開く"
>
  目次
</button>
      </div>

      <div
        className={`${styles.panel} ${open ? styles.open : ""}`}
        onClick={() => setOpen(false)}
      >
        <div
          className={styles.inner}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.head}>
            <p className={styles.kicker}>TABLE OF CONTENTS</p>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <nav className={styles.nav}>
            {items.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`${styles.item} ${active ? styles.active : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.sub}>{item.sub}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}