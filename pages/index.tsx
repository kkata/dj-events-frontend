import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import type { GetStaticPropsResult } from "next";
import { Data } from "../type";

const Home = ({ events }: { events: Data[] }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
};

// ref. https://blog.webcreativepark.net/2022/01/21-140314.html
export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{ events: Data[] }>
> => {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
};

export default Home;
