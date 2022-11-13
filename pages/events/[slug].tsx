import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

import { Data } from "type";

export default function Event({ evt }: { evt: Data }) {
  return (
    <Layout>
      <h1>{evt.name}</h1>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
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
  const res = await fetch(`${API_URL}/api/events/${slug}`);
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
