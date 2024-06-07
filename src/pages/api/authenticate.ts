import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function authenticate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    Object.keys(cookies).forEach((key) => {
      let cookieString = `${key}=${cookies[key]}; Max-Age=3600; Path=/`;
      res.setHeader("Set-Cookie", cookieString);
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error occurred:", error);
    res.redirect("/login");
  }
}
