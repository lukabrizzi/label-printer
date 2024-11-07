import React, { useState } from "react";
import * as XLSX from "xlsx";

interface Product {
  name: string;
  unit_price: number;
  quantity: number;
  total: number;
}

const ExcelProcess = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleProcessClick = async () => {
    if (!file) {
      alert("Please select an Excel file to process.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;

      if (result instanceof ArrayBuffer) {
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows: (string | number | null)[][] = XLSX.utils.sheet_to_json(
          worksheet,
          { header: 1 }
        );

        const products: Product[] = [];
        for (let i = 4; i < rows.length; i++) {
          const row = rows[i];

          const productName = row[1];
          const unitPrice = row[3];
          const quantity = row[4];
          const total = row[5];

          if (productName && quantity && total && Number(quantity) >= 1) {
            products.push({
              name: productName as string,
              unit_price: unitPrice as number,
              quantity: quantity as number,
              total: total as number,
            });
          }
        }

        console.log("Products to be processed:", products);
        // Aquí podrías hacer la integración con QuickBooks usando una función adicional
        // o enviar `products` a tu backend para el procesamiento.
      } else {
        console.error("Error: The file is not an ArrayBuffer.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-2">
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm p-3"
        >
          {file ? file.name : "Choose an Excel file"}
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <button
        onClick={handleProcessClick}
        className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-300"
      >
        Process
      </button>
    </div>
  );
};

export default ExcelProcess;
