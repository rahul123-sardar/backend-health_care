import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios({
      method: req.method,
      url: "https://backend-health-care-wrp.vercel.app/api/patient",
      data: req.body,
      headers: req.headers,
    });

    // Allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Proxy error" });
  }
}