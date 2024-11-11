module.exports = async (req, res) => {
  const CLIENT_ID = "ABeiD5tA86GbS5MlhBU3UWNhwaRzCL7F8bqr6eTMIJSNrmgdrw";
  const CLIENT_SECRET = "yaDemaaCTLWgEKu4J8QKd37WjR9t9BlCL6YBMUw9";
  const REDIRECT_URI = "https://label-print.vercel.app/api/quickbooks";

  if (req.method === "POST") {
    try {
      const { products } = req.body;

      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ message: "No products data provided" });
      }

      console.log("Products to process:", products);
      res
        .status(200)
        .json({ message: "Data processed successfully", data: products });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else if (req.method === "GET") {
    const { code } = req.query;

    if (!code) {
      const authorizationUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}&scope=com.intuit.quickbooks.accounting&response_type=code`;
      return res.redirect(authorizationUrl);
    }

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

      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const realmId = data.realmId;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("Realm ID:", realmId);

      res.status(200).json({
        message: "Tokens obtained",
        accessToken,
        refreshToken,
        realmId,
      });
    } catch (error) {
      console.error("Error intercambiando el código por el token:", error);
      res.status(500).json({ error: "Failed to get access token" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
