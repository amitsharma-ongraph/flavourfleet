

import { NextApiRequest, NextApiResponse } from "next";


export default async  function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies=req.body.cookies
  console.log("server loing req cookies",cookies)
  if (cookies) {
    const cookieStrings = Object.entries(cookies).map(([key, value]) => {
    
      return `${key}heyhey=${value}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=3600`;
    })
    
    res.setHeader('Set-Cookie', cookieStrings);
  }
  res.status(200).json({ message: "Hello from the API!" });
}
