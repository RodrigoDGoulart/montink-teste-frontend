import Gallery from "./components/Gallery";
const url = 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

function App() {
  return (
    <div>
      <Gallery images={[url, url, url, url, url, url, url,]} />
    </div>
  );
}

export default App;
