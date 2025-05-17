import type { Product } from "../@types/entities";

class Storage {
  public store(product: Product) {
    localStorage.setItem("product", JSON.stringify(product));
  }

  public get(): Product | null {
    const product = localStorage.getItem("product");

    if (!product || product === 'undefined') {
      return null;
    }

    return JSON.parse(product);
  }
}

export default new Storage();