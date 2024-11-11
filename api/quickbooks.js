const crypto = require("crypto");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const CLIENT_ID = "ABeiD5tA86GbS5MlhBU3UWNhwaRzCL7F8bqr6eTMIJSNrmgdrw";
  const CLIENT_SECRET = "yaDemaaCTLWgEKu4J8QKd37WjR9t9BlCL6YBMUw9";
  const REDIRECT_URI = "https://label-print.vercel.app/api/quickbooks";

  if (req.method === "GET") {
    const { code, state: returnedState } = req.query;

    if (code && returnedState === req.session.oauthState) {
      const url = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
      const body = new URLSearchParams({
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      });

      const headers = {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body,
        });

        const data = await response.json();
        if (data.error) {
          return res.status(500).json({ error: data.error });
        }

        req.session.accessToken = data.access_token;
        req.session.refreshToken = data.refresh_token;
        req.session.realmId = req.query.realmId;

        return res.status(200).json({ message: "Authentication successful" });
      } catch (error) {
        console.error("Error exchanging code for token:", error);
        return res.status(500).json({ error: "Failed to get access token" });
      }
    } else if (!code) {
      const state = crypto.randomBytes(16).toString("hex");
      req.session.oauthState = state;

      const authorizationUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}&scope=com.intuit.quickbooks.accounting&response_type=code&state=${state}`;
      return res.redirect(authorizationUrl);
    } else {
      return res.status(400).json({ error: "Invalid state parameter" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};
