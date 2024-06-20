import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("server side loing api called",req.body);
  res.status(200).json({ message: "Hello from the API!" });
}
