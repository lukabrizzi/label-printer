import React, { useCallback, useState } from "react";
import TextField from "./TextField.tsx";
import Button from "./Button.tsx";
import { Plus, X } from "lucide-react";

interface Labels {
  clientNumber: number;
  wharehouseNumber: number;
  boxNumber: number;
  additionalFields?: { label: string; value: string }[];
}

const LabelForm = () => {
  const [clientNumber, setClientNumber] = useState<number>(0);
  const [wharehouseNumber, setWharehouseNumber] = useState<number>(0);
  const [amountBoxes, setAmountBoxes] = useState<number>(0);
  const [amountCopies, setAmountCopies] = useState<number>(0);
  const [additionalFields, setAdditionalFields] = useState<
    { label: string; value: string }[]
  >([]);

  const addField = () => {
    setAdditionalFields([...additionalFields, { label: "", value: "" }]);
  };

  const handleFieldChange = (
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    const updatedFields = [...additionalFields];
    updatedFields[index][key] = value;
    setAdditionalFields(updatedFields);
  };

  const removeField = (index: number) => {
    const updatedFields = additionalFields.filter((_, i) => i !== index);
    setAdditionalFields(updatedFields);
  };

  const handleGenerate = useCallback(() => {
    if (amountBoxes > 0 && amountCopies > 0) {
      const labels: Labels[] = [];
      for (let index = 1; index <= amountBoxes; index++) {
        for (let copyIndex = 1; copyIndex <= amountCopies; copyIndex++) {
          labels.push({
            clientNumber,
            wharehouseNumber,
            boxNumber: index,
            additionalFields,
          });
        }
      }

      const printWindow = window.open("", "", "height=800,width=600");
      if (printWindow) {
        printWindow.document.write("<html><head><title>Labels</title>");
        printWindow.document.write(
          "<style>.label-print-page { page-break-before: always; font-family: Arial, sans-serif; }</style>"
        );
        printWindow.document.write("</head><body>");

        labels.forEach((label) => {
          printWindow?.document.write(`
            <div class="label-print-page">
              <p>Client Number: ${label.clientNumber}</p>
              <p>Wharehouse Number: ${label.wharehouseNumber}</p>
              <p>Box Number: ${label.boxNumber}</p>
          `);

          label.additionalFields?.forEach((field) => {
            printWindow?.document.write(`
              <p>${field.label}: ${field.value}</p>
            `);
          });

          printWindow?.document.write("</div>");
        });

        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      }
    }
  }, [
    amountBoxes,
    clientNumber,
    wharehouseNumber,
    amountCopies,
    additionalFields,
  ]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGenerate();
      }}
    >
      <div className="w-[420px] bg-gray-400 rounded-xl p-10 py-16 shadow-xl">
        <div className="flex flex-col space-y-6">
          <TextField>
            <div className="flex flex-col items-start w-full">
              Client Number
              <TextField.Input
                type="number"
                required
                value={clientNumber || ""}
                onChange={(e) =>
                  setClientNumber(
                    Number((e.currentTarget as HTMLInputElement).value)
                  )
                }
              />
            </div>
          </TextField>
          <TextField>
            <div className="flex flex-col items-start">
              Wharehouse Number
              <TextField.Input
                type="number"
                required
                value={wharehouseNumber || ""}
                onChange={(e) =>
                  setWharehouseNumber(
                    Number((e.currentTarget as HTMLInputElement).value)
                  )
                }
              />
            </div>
          </TextField>
          <TextField>
            <div className="flex flex-col items-start">
              Amount of boxes
              <TextField.Input
                type="number"
                required
                value={amountBoxes || ""}
                onChange={(e) =>
                  setAmountBoxes(
                    Number((e.currentTarget as HTMLInputElement).value)
                  )
                }
              />
            </div>
          </TextField>
          <TextField>
            <div className="flex flex-col items-start">
              Amount of copies
              <TextField.Input
                type="number"
                required
                value={amountCopies || ""}
                onChange={(e) =>
                  setAmountCopies(
                    Number((e.currentTarget as HTMLInputElement).value)
                  )
                }
              />
            </div>
          </TextField>

          <button
            type="button"
            onClick={addField}
            className="flex items-center justify-center space-x-2 text-blue-500 bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add Field</span>
          </button>

          {additionalFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-4">
              <TextField.Input
                type="text"
                placeholder="Label"
                value={field.label}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "label",
                    (e.currentTarget as HTMLInputElement).value
                  )
                }
              />
              <TextField.Input
                type="text"
                placeholder="Value"
                value={field.value}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "value",
                    (e.currentTarget as HTMLInputElement).value
                  )
                }
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          <Button type="submit">Generate</Button>
        </div>
      </div>
    </form>
  );
};

export default LabelForm;
