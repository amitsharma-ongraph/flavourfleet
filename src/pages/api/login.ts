import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("server side loing api called",req.headers.cookie);
  res.status(200).json({ message: "Hello from the API!" });
}
