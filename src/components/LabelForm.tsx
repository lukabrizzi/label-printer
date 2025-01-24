import React, { useCallback, useState } from "react";
import { Plus, X } from "lucide-react";

interface Labels {
  clientNumber: number;
  wharehouseNumber: number;
  boxNumber: number;
}

const LabelForm = () => {
  const [clientNumber, setClientNumber] = useState<number>(0);
  const [wharehouseNumber, setWharehouseNumber] = useState<number>(0);
  const [amountBoxes, setAmountBoxes] = useState<number>(0);
  const [amountCopies, setAmountCopies] = useState<number>(0);
  const [additionalFields, setAdditionalFields] = useState<
    { label: string; value: string }[]
  >([]);

  const handleGenerate = useCallback(() => {
    if (amountBoxes > 0 && amountCopies > 0) {
      const labels: Labels[] = [];
      for (let index = 1; index <= amountBoxes; index++) {
        for (let copyIndex = 1; copyIndex <= amountCopies; copyIndex++) {
          labels.push({ clientNumber, wharehouseNumber, boxNumber: index });
        }
      }

      const printWindow = window.open("", "", "height=800,width=600");
      if (printWindow) {
        printWindow.document.write("<html><head><title>Labels</title>");
        printWindow.document.write(`
          <style>
            @media print {
              .label-print-page {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family: sans-serif;
                background-color: #f0f8ff;
                margin: 0;
                page-break-before: always;
                transform: rotate(90deg);
              }
  
              .label-print-page p {
                margin: 0;
                width: 100%;
                text-align: center;
                font-size: 12vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          </style>
        `);
        printWindow.document.write("</head><body style='margin: 0;'>");

        labels.forEach((label) => {
          printWindow.document.write(`
            <div class="label-print-page">
              <p>#: ${label.clientNumber}</p>
              <p>W: ${label.wharehouseNumber}</p>
              <p>U: ${label.boxNumber}</p>
            </div>
          `);
        });

        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      }
    }
  }, [amountBoxes, clientNumber, wharehouseNumber, amountCopies]);

  const addField = () => {
    setAdditionalFields([...additionalFields, { label: "", value: "" }]);
  };

  const removeField = (index: number) => {
    setAdditionalFields(additionalFields.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGenerate();
      }}
      className="h-[650px] w-full max-w-lg mx-auto p-8 border-[0.5px] border-gray-700 shadow-inner rounded-lg space-y-8 overflow-y-scroll"
    >
      <h2 className="text-2xl font-semibold text-center text-white">
        Label Generator
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-400">Client Number</label>
          <input
            type="number"
            required
            value={clientNumber || ""}
            onChange={(e) => setClientNumber(Number(e.currentTarget.value))}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-400">Warehouse Number</label>
          <input
            type="number"
            required
            value={wharehouseNumber || ""}
            onChange={(e) => setWharehouseNumber(Number(e.currentTarget.value))}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-400">Amount of Boxes</label>
          <input
            type="number"
            required
            value={amountBoxes || ""}
            onChange={(e) => setAmountBoxes(Number(e.currentTarget.value))}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-400">Amount of Copies</label>
          <input
            type="number"
            required
            value={amountCopies || ""}
            onChange={(e) => setAmountCopies(Number(e.currentTarget.value))}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4">
        <button
          type="button"
          onClick={addField}
          className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Field
        </button>
      </div>

      <div className="space-y-4">
        {additionalFields.map((field, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Label"
              value={field.label}
              onChange={(e) =>
                setAdditionalFields((prevFields) => {
                  const newFields = [...prevFields];
                  newFields[index].label = e.target.value;
                  return newFields;
                })
              }
              className="w-full px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Value"
              value={field.value}
              onChange={(e) =>
                setAdditionalFields((prevFields) => {
                  const newFields = [...prevFields];
                  newFields[index].value = e.target.value;
                  return newFields;
                })
              }
              className="w-full px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeField(index)}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              <X className="text-white h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
      >
        Generate
      </button>
    </form>
  );
};

export default LabelForm;
