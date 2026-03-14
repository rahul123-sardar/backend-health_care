import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = `https://backend-health-care-97bf.vercel.app/api/patient`;
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: req.headers,
    });

    // Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Proxy error" });
  }
}