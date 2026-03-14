export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://frontend-health-care-pink.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // preflight request
    return res.status(200).end();
  }

  if (req.method === "GET") {
    // fetch patients
    return res.status(200).json([]); // replace with your data
  } else if (req.method === "POST") {
    // save patient logic
    return res.status(200).json({ message: "Patient added" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}