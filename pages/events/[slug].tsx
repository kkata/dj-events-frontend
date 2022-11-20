import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

import styles from "@/styles/Event.module.css";

import { Data } from "type";

export default function Event({ evt }: { evt: Data }) {
  const deleteEvent = (e: React.MouseEvent) => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Event Edit
          </Link>
          <button className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </button>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={900}
              height={600}
              alt=""
            />
          </div>
        )}
        <h2>Performers:</h2>
        <p>{evt.performers}</p>
        <h2>Description:</h2>
        <p>{evt.description}</p>
        <h2>Venue: {evt.venue}</h2>
        <p>{evt.address}</p>

        <Link href="/events" className={styles.back}>
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt: Data) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: Data["slug"] };
}) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({
//   query: { slug },
// }: {
//   query: { slug: Data["slug"] };
// }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
