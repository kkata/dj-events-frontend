import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

import { Data } from "../type";

type Props = {
  evt: Data;
};

export default function EventItem({ evt }: Props) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
          alt=""
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h2>{evt.name}</h2>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
}
