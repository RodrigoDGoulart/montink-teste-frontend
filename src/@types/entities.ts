export interface Product {
  title: string;
  desc: string;
  price: number;
  imgs: string[];
  fields?: Field[];
  details?: ProductDetails[];
}

export interface Field {
  type: 'text' | 'color';
  label: string;
  name: string;
  placeholder?: string;
  options: Option[];
}

export interface Option {
  label: string;
  value: string | number;
}

export interface ProductDetails {
  field: string;
  value: string | number;
}

export interface Address {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  erro?: boolean;
}