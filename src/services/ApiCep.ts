import axios from "axios";
import type { Address } from "../@types/entities";

class ApiCep {
  private static readonly BASE_URL = "https://viacep.com.br/ws/";

  public async getAddress(cep: string): Promise<Address> {
    try {
      const response = await axios.get<Address>(`${ApiCep.BASE_URL}${cep}/json/`);
      return response.data;
    } catch(err) {
      throw new Error("Erro ao buscar o CEP: " + err);
    }
  }
}

export default new ApiCep();