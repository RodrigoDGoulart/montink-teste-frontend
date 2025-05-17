import type { Product } from "./@types/entities";
import ItemCard from "./components/ItemCard";

const url = 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const product: Product = {
  title: 'Produto teste',
  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
  price: 999.99,
  imgs: [url, url, url, url, url],
  fields: [
    {
      type: 'color',
      label: 'Cor',
      name: 'cor',
      options: [
        { label: 'Vermelho', value: 'red' },
        { label: 'Roxo', value: 'purple' },
        { label: 'Cinza', value: 'gray' },
      ]
    },
    {
      type: 'color',
      label: 'Cor',
      name: 'cor2',
      options: [
        { label: 'Vermelho', value: 'red' },
        { label: 'Roxo', value: 'purple' },
        { label: 'Cinza', value: 'gray' },
      ]
    },
    {
      type: 'color',
      label: 'Cor',
      name: 'cor3',
      options: [
        { label: 'Vermelho', value: 'red' },
        { label: 'Verde', value: 'green' },
        { label: 'Roxo', value: 'purple' },
        { label: 'Cinza', value: 'gray' },
      ]
    },
    {
      type: 'text',
      label: 'Tamanho',
      name: 'size',
      placeholder: 'Selecione um tamanho',
      options: [
        { label: 'P', value: 'p' },
        { label: 'M', value: 'm' },
        { label: 'G', value: 'g' },
      ]
    },
    {
      type: 'text',
      label: 'Tamanho',
      name: 'siz2',
      placeholder: 'Selecione um tamanho',
      options: [
        { label: 'XP', value: 'xp' },
        { label: 'P', value: 'p' },
        { label: 'M', value: 'm' },
        { label: 'G', value: 'g' },
        { label: 'GG', value: 'gg' },
      ]
    },
    {
      type: 'text',
      label: 'Tamanho',
      name: 'siz3',
      placeholder: 'Selecione um tamanho',
      options: [
        { label: 'XP', value: 'xp' },
        { label: 'P', value: 'p' },
        { label: 'M', value: 'm' },
        { label: 'G', value: 'g' },
        { label: 'GG', value: 'gg' },
      ]
    },
  ]
};

function App() {
  return (
    <main className="m-auto mt-[36px] w-[75%] m-4">
      <ItemCard
        product={product}
        onBuySubmit={info => console.log(info)}
      />
    </main>
  );
}

export default App;
