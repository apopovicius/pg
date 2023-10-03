import "./App.css";
import Nav from "./components/Nav";
import Card from "./components/Card";
import travelData from "./data";

function App() {
  const travelCards = travelData.map((card) => <Card {...card} />);
  return (
    <div className="App">
      <Nav />
      {travelCards}
    </div>
  );
}

export default App;
