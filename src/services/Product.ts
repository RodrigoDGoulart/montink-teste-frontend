import axios from "axios";
import type { Product as ProductType } from "../@types/entities";

class Product {
  public async getProduct(): Promise<ProductType> {
    try {
      const product = await axios.get("/product.json");
      return product.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }
}

export default new Product();