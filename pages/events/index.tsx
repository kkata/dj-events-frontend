import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import type { GetStaticPropsResult } from "next";
import { Data } from "../../type";

const Events = ({ events }: { events: Data[] }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h2>No events to show</h2>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
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

export default Events;
