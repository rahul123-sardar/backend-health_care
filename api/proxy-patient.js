import axios from "axios";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await axios({
      method: req.method,
      url: "https://backend-health-care-wrp.vercel.app/api/patient",
      data: req.body,
      headers: { "Content-Type": req.headers["content-type"] || "application/json" },
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Proxy error:", err.message || err);
    res.status(500).json({ message: "Proxy error" });
  }
}
