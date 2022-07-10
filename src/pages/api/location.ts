import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ip = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress;
    const ipInfo = await fetch(`http://ip-api.com/json/${ip}`, { method: 'POST' });
    const parsedIpInfo = await ipInfo.json();

    res.send(parsedIpInfo);
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
}
