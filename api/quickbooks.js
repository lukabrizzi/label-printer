module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { accessToken } = req.body;
    res.status(200).json({ message: "Success" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
