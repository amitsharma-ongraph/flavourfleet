import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.headers.cookie;

  if (cookies) {
    const cookieArray = cookies.split("; ");

    const cookieStrings = cookieArray.map((cookie) => {
      const [key] = cookie.split("=");
      return `${key}="null"; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0`;
    });
    console.log("server side logout cookieString", cookieStrings);
    res.setHeader("Set-Cookie", cookieStrings);
  }
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/logout`
  );
  console.log("server side logout response", response);
  const { data } = response;
  //  res.setHeader("Set-Cookie", response.headers["set-cookie"] || [""]);
  res.status(200).send(data);
}
