module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Obtén los datos del body de la solicitud
      const { products } = req.body;
      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ message: "No products data provided" });
      }

      // Aquí iría tu lógica de integración con QuickBooks

      console.log("Productos a procesar:", products); // Verifica que los productos lleguen correctamente

      // Simula un proceso exitoso (reemplaza esto por tu integración real)
      res
        .status(200)
        .json({ message: "Data processed successfully", data: products });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    // Si no es un método POST, respondemos con 405
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
