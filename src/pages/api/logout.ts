import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

 const cookies = req.headers.cookie;
  
 if (cookies) {
   const cookieArray = cookies.split('; ');
   console.log("logout cookie array",cookies);
   const cookieStrings = cookieArray.map(cookie => {
     const [key] = cookie.split('=');
     return `${key}="null"; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0; Expires=${new Date(0).toUTCString()}`;
   });
   res.setHeader('Set-Cookie', cookieStrings);
 }


  res.status(200).json({ message: "Hello from the API!" });
}
