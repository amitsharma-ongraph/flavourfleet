
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async  function handler(req: NextApiRequest, res: NextApiResponse) {
  const response=await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,{
    username:"test@gmail.com",
    password:"test9898"
  });
  console.log("server login response",response.data)

  res.status(200).json({ message: "Hello from the API!" });
}
