import { Button, MenuItem, Select } from "@mui/material";
import Gallery from "../Gallery";
import Label from "../Label";
import ColorSelector from "../ColorSelector";
import type { Product, ProductDetails } from "../../@types/entities";
import { useEffect, useState } from "react";
import CepField from "../CepField";
import { toast } from "sonner";
import Storage from "../../services/Storage";

interface Props {
  product: Product;
  onBuySubmit: (product: Product) => void;
  onSelectOption: (selectedOptions: ProductDetails[]) => void;
}

export default function ItemCard({ product, ...props }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<ProductDetails[]>(product.details || []);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  function handleOptionSelection(field: string, value: string) {
    if (fieldErrors.includes(field)) {
      setFieldErrors((prev) => prev.filter((f) => f !== field));
    }

    const selected = selectedOptions.find((op) => op.field === field);
    if (selected) {
      const options = selectedOptions.map((op) => op.field === field ? { ...op, value } : op)
      props.onSelectOption(options);
      setSelectedOptions(options);
    } else {
      const options = [...selectedOptions, {field, value}];
      props.onSelectOption(options);
      setSelectedOptions(options);
    }
  }

  function getFieldValue(field: string) {
    return selectedOptions.find((op) => op.field === field)?.value;
  }

  function handleBuySubmit() {
    if (!selectedOptions.length) {
      toast.error(`Selecione os campos vazios!`);
      setFieldErrors(product.fields?.map((field) => field.name) || []);
      return;
    }
    let error = false;
    product.fields?.forEach((field) => {
      const selected = selectedOptions.find((op) => op.field === field.name);
      if (!selected) {
        toast.error(`Selecione o campo ${field.label}`);
        setFieldErrors((prev) => [...prev, field.name]);
        error = true;
        return;
      }
      if (!selected.value) {
        toast.error(`Selecione o campo ${field.label}`);
        setFieldErrors((prev) => [...prev, field.name]);
        error = true;
        return;
      }
    });
    if (error) return;
    props.onBuySubmit({
      ...product,
      details: product.fields?.map((field) => ({
        field: field.name,
        value: getFieldValue(field.name) || "",
      })),
    });
  }

  useEffect(() => {
    const storedProduct = Storage.get();
    console.log({storedProduct})
    if (storedProduct) {
      setSelectedOptions(storedProduct.details || []);
    }
  }, []);

  if (!product.fields) return;
  return (
    <div className="flex max-md:flex-col gap-[32px] mb-8 max-w-[900px]">
      <div className="md:w-[40%] md:max-w-[600px]">
        <Gallery images={product.imgs} />
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">{product.title}</h1>
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
              <Label
                key={field.name}
                label={field.label}
                error={fieldErrors.includes(field.name)}
              >
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
              <Label
                key={field.name}
                label={field.label}
                error={fieldErrors.includes(field.name)}
              >
                <Select
                  error={fieldErrors.includes(field.name)}
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
        <div className="w-full mb-1">
          <Button
            onClick={handleBuySubmit}
            variant="contained"
            color="success"
            className="w-full h-[48px]"
          >
            Comprar
          </Button>
        </div>
        <div>
          <CepField />
        </div>
      </div>
    </div>
  );
}
