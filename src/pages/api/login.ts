

import { NextApiRequest, NextApiResponse } from "next";


export default async  function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies=req.body.cookies
  console.log("server loing req cookies",cookies)
  res.status(200).json({ message: "Hello from the API!" });
}
