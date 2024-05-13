import styles from "@/styles/card.module.css";
import Link from "next/link";

import Flag from "react-world-flags";

export default function Card({ id, name, emoji, code, continent }: Country) {
  return (
    <Link href={`/${code}`} className={styles.link}>
      <article className={styles.article}>
        <h2 className={styles.title}>{name}</h2>
        <Flag code={code} className={styles.flag} />
      </article>
    </Link>
  );
}
