import ColorSelector from "./components/ColorSelector";

function App() {
  return (
    <div>
      <ColorSelector 
        color="#ff0000"
        selected={true}
        onClick={() => console.log('teste')}
      />
    </div>
  );
}

export default App;
