import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";
import type { GetStaticPropsResult } from "next";
import { Data } from "../../type";
import Pagination from "@/components/Pagination";

type Props = {
  events: Data[];
  page: number;
  total: number;
};

const Events = ({ events, page, total }: Props) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h2>No events to show</h2>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
};

// ref. https://blog.webcreativepark.net/2022/01/21-140314.html
export const getServerSideProps = async ({
  query: { page = 1 },
}): Promise<GetStaticPropsResult<Props>> => {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // ref. https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#count-entries
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
};

export default Events;
