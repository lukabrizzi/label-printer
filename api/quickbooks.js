const crypto = require("crypto");

module.exports = async (req, res) => {
  const CLIENT_ID = "ABeiD5tA86GbS5MlhBU3UWNhwaRzCL7F8bqr6eTMIJSNrmgdrw";
  const CLIENT_SECRET = "yaDemaaCTLWgEKu4J8QKd37WjR9t9BlCL6YBMUw9";
  const REDIRECT_URI = "https://label-print.vercel.app/api/quickbooks";

  if (req.method === "GET") {
    const state = crypto.randomBytes(16).toString("hex");
    req.session = req.session || {};
    req.session.oauthState = state;

    const authorizationUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=com.intuit.quickbooks.accounting&response_type=code&state=${state}`;
    return res.redirect(authorizationUrl);
  }

  if (req.method === "POST") {
    try {
      const { state: returnedState, code } = req.query;

      if (returnedState !== req.session.oauthState) {
        return res.status(400).json({ error: "Invalid state parameter" });
      }

      delete req.session.oauthState;
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};
