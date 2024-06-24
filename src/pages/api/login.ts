import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const cookies=req.body.cookies
  // console.log("server loing req cookies",cookies)
  // if (cookies) {
  //   const cookieStrings = Object.entries(cookies).map(([key, value]) => {

  //     return `${key}=${value}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=3600`;
  //   })

  //   res.setHeader('Set-Cookie', cookieStrings);
  // }
  const { username, password } = req.body;
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
    {
      username,
      password,
    }
  );
  const { data } = response;
  res.setHeader("Set-Cookie", response.headers["set-cookie"] || [""]);
  res.status(200).send(data);
}
