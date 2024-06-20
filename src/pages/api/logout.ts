import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const cookieKeys = ['session', 'session.sig'];

  const cookieStrings = cookieKeys.map(key => {
    return `${key}=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0; Expires=${new Date(0).toUTCString()}`;
  });


  res.setHeader('Set-Cookie', cookieStrings);


  res.status(200).json({ message: "Hello from the API!" });
}
