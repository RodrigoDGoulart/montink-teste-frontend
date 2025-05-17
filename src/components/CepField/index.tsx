import { Button, TextField } from "@mui/material";
import Label from "../Label";
import { useState } from "react";
import ApiCep from "../../services/ApiCep";

export default function CepField() {
  const [cep, setCep] = useState("");
  const [cepReturn, setCepReturn] = useState<{
    type: "success" | "error";
    text: string;
  }>();
  const [loading, setLoading] = useState(false);

  function handleCepSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading || !cep) return;
    if (cep.length !== 8) {
      setCepReturn({ type: "error", text: "CEP inválido!" });
      return;
    }

    setLoading(true);
    ApiCep.getAddress(cep)
    .then(res => {
      if (res.erro) {
        setCepReturn({ type: "error", text: "CEP não encontrado!" });
        return;
      }
      const address = `${res.logradouro} ${res.complemento ? `, ${res.complemento}` : ""} - ${res.bairro} - ${res.localidade} - ${res.uf}`;
      setCepReturn({ type: "success", text: `Entrega disponível! Endereço: ${address}`  });
    }).catch(err => {
      console.error(err);
      setCepReturn({ type: "error", text: "Erro ao buscar CEP." });
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="w-full">
      <Label label="Verifique a disponibilidade da entrega">
        <form onSubmit={handleCepSubmit} className="flex gap-4">
          <TextField
            size="small"
            className="flex-1"
            placeholder="CEP"
            onChange={(e) => setCep(e.target.value)}
            slotProps={{ htmlInput: { maxLength: 8 } }}
          />
          <Button type="submit" variant="contained" loading={loading}>
            Pesquisar
          </Button>
        </form>
        {cepReturn && (
          <span
            className={`font-bold text-lg ${
              cepReturn.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {cepReturn.text}
          </span>
        )}
      </Label>
    </div>
  );
}
