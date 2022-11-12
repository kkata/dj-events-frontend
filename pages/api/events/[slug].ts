import { events } from "./data.json";
import type { NextApiRequest, NextApiResponse } from "next";

import type { Data } from "../../../type";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | { message: string }>
) {
  const evt = events.filter((ev) => ev.slug === req.query.slug);

  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      message: `Method ${req.method} is not allowed`,
    });
  }
}
