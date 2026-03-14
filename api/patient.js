export default async function handler(req, res) {
  // Enable CORS for your frontend
  res.setHeader("Access-Control-Allow-Origin", "https://frontend-health-care-pink.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Preflight request
    return res.status(200).end();
  }

  if (req.method === "GET") {
    // Fetch patients from your database
    // Example: return dummy data for testing
    const patients = [
      {
        _id: "1",
        patientId: 101,
        name: "John Doe",
        vitals: "120/80",
        billingCode: 555,
        diagnosis: "Healthy",
        notes: "No issues",
        image: "https://via.placeholder.com/120"
      }
    ];
    return res.status(200).json(patients);
  }

  if (req.method === "POST") {
    // Save patient logic here
    // Access form-data if sending files
    return res.status(200).json({ message: "Patient added successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
