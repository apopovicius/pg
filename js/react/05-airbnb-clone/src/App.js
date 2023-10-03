import { wait } from "@testing-library/user-event/dist/utils";
import "./App.css";
import Card from "./components/Card";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import data from "./data.js";

/* test area imports */
//import whiskerson from "./images/mr-whiskerson.png";
//import fluffy from "./images/fluffykins.png";
//import felix from "./images/felix.png";
//import pumpkin from "./images/pumpkin.png";
//

// Card V1
//
// <Card
//        img="katie-zaferes.png"
//        rating={5.0}
//        reviewCount={6}
//        location="USA"
//        title="Life lessons with Katie Zaferes"
//        price={160}
//      />
//
// Card V2
//
// <Card
// key={card.id}
// img={card.coverImg}
// rating={card.stats.rating}
// reviewCount={card.stats.reviewCount}
// location={card.location}
// title={card.title}
// price={card.price}
// openSpots={card.openSpots}
// />
//
// Card V3
// <Card
// key={card.id}
// card={card}
// />;

function App() {
  const cardsElements = data.map((card) => {
    return <Card key={card.id} {...card} />;
  });
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <section className="cards">{cardsElements}</section>
      <br />
      <br />
      <hr />
      <div
        className="contacts"
        comment="remove display:none from css to make it visible"
      >
        <h1> UNDER IS TEST AREA OF CONTACT CARD </h1>
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
