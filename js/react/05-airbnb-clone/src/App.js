import "./App.css";
import Card from "./components/Card";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

/* test area imports */
//import whiskerson from "./images/mr-whiskerson.png";
//import fluffy from "./images/fluffykins.png";
//import felix from "./images/felix.png";
//import pumpkin from "./images/pumpkin.png";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Card
        img="katie-zaferes.png"
        rating={5.0}
        reviewCount={6}
        country="USA"
        title="Life lessons with Katie Zaferes"
        price={160}
      />
      <br />
      <br />
      <br />
      <hr />
      <h1> UNDER IS TEST AREA OF CONTACT CARD </h1>
      <div className="contacts">
        <Contact
          img="./images/mr-whiskerson.png"
          name="Mr. Whiskerson"
          phone="(212)555-1234"
          mail="mr.whiskaz@catnap.meow"
        />
        <Contact
          img="./images/felix.png"
          name="Felix"
          phone="(212)555-2345"
          mail="felix@catnap.meow"
        />
        <Contact
          img="./images/fluffykins.png"
          name="Fluffykins"
          phone="(212)555-4567"
          mail="fluffykins@catnap.meow"
        />
        <Contact
          img="./images/pumpkin.png"
          name="Pumpkin"
          phone="(212) CAT KING"
          mail="pumpkin@catnap.meow"
        />
      </div>
    </div>
  );
}

export default App;
