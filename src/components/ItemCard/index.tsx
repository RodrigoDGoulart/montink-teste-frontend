import { Button, MenuItem, Select } from "@mui/material";
import Gallery from "../Gallery";
import Label from "../Label";
import ColorSelector from "../ColorSelector";
import type { Product } from "../../@types/entities";
import { useState } from "react";

interface Props {
  product: Product;
  onBuySubmit: (product: Product) => void;
}

export default function ItemCard({ product, ...props }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<
    { field: string; value: string }[]
  >([]);

  function handleOptionSelection(field: string, value: string) {
    const selected = selectedOptions.find((op) => op.field === field);
    if (selected) {
      setSelectedOptions((prev) =>
        prev.map((op) => (op.field === field ? { ...op, value } : op))
      );
    } else {
      setSelectedOptions((prev) => [...prev, { field, value }]);
    }
  }

  function getFieldValue(field: string) {
    return selectedOptions.find((op) => op.field === field)?.value;
  }

  function handleBuySubmit() {
    props.onBuySubmit({
      ...product,
      details: product.fields?.map((field) => ({
        field: field.name,
        value: getFieldValue(field.name) || "",
      })),
    });
  }

  if (!product.fields) return;
  return (
    <div className="flex gap-[32px]">
      <div className="w-[40%] max-w-[600px]">
        <Gallery images={product.imgs} />
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">
            R${" "}
            {product.price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
          <p className="text-gray-500">{product.desc}</p>
        </div>
        <hr className="w-[40%] max-w-[300px]" />
        <div className="flex gap-[32px] flex-wrap">
          {product.fields
            .filter((field) => field.type === "color")
            .map((field) => (
              <Label key={field.name} label={field.label}>
                <div className="flex gap-2">
                  {field.options.map((option) => (
                    <ColorSelector
                      key={option.value as string}
                      color={option.value as string}
                      onClick={() =>
                        handleOptionSelection(
                          field.name,
                          option.value as string
                        )
                      }
                      selected={
                        (getFieldValue(field.name) || ``) === option.value
                      }
                    />
                  ))}
                </div>
              </Label>
            ))}
        </div>
        <div className="flex gap-[32px] flex-wrap">
          {product.fields
            .filter((field) => field.type !== "color")
            .map((field) => (
              <Label key={field.name} label={field.label}>
                <Select
                  value={getFieldValue(field.name) || ""}
                  onChange={(e) =>
                    handleOptionSelection(field.name, e.target.value as string)
                  }
                  size="small"
                >
                  {field.options.map((option) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </Label>
            ))}
        </div>
        <div className="flex-1"></div>
        <Button onClick={handleBuySubmit} variant="contained" color="success" className="w-full h-[48px]">
          Comprar
        </Button>
      </div>
    </div>
  );
}
