import { useEffect, useState } from "react";
import type { ProductDetails, Product as ProductType } from "./@types/entities";
import ItemCard from "./components/ItemCard";
import Product from "./services/Product";
import { toast } from "sonner";
import Storage from "./services/Storage";

function App() {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);

  function handleBuySubmit(info: ProductType) {
    console.log(info);
    toast.success("Compra realizada com sucesso!");
  }

  function handleSelectOption(details: ProductDetails[]) {
    if (product) {
      Storage.store({ ...product, details });
      console.log({ ...product, details });
      setProduct((prev) => ({ ...prev!, details }));
    }
  }

  useEffect(() => {
    setLoading(true);
    Product.getProduct()
      .then((res) => {
        if (!res) {
          toast.error("Produto não encontrado");
          return;
        }
        setProduct(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Erro ao buscar produto. Verifique o json configurado na pasta public"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="m-auto mt-[36px] w-[75%] flex flex-col items-center">
      {product && !loading && (
        <ItemCard
          product={product}
          onBuySubmit={handleBuySubmit}
          onSelectOption={handleSelectOption}
        />
      )}
    </main>
  );
}

export default App;
