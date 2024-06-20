
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', req.body.cookies);
  res.status(200).json({ message: "Hello from the API!" });
}
