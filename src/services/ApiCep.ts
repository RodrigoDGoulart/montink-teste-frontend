import type { Address } from "../@types/entities";

class ApiCep {
  private static readonly BASE_URL = "https://viacep.com.br/ws/";

  public async getAddress(cep: string): Promise<Address> {
    const response = await fetch(`${ApiCep.BASE_URL}${cep}/json/`);
    if (!response.ok) {
      throw new Error("Failed to fetch address");
    }
    const address: Address = await response.json();
    return address;
  }
}

export default new ApiCep();