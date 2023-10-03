import React from "react";

function transformCountry(country) {
  return country
    .split("")
    .map((letter) => letter.toUpperCase())
    .join(" ");
}

/* unit-test
export default function Card() {
  return (
    <section className="card">
      <div className="card--area">
        <img
          src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTg1NzY3Ng&ixlib=rb-4.0.3&q=80&w=1080"
          className="card--image"
        />
        <div className="card--description">
          <header className="card--header">
            <img src="./images/pin.png" className="card--header-pin" />
            <span className="card--header-country">AUSTRALIA</span>
            <a
              href="https://www.google.com/maps/place/Opera+din+Sydney/@-33.8567844,151.2152967,15z/data=!4m6!3m5!1s0x6b12ae665e892fdd:0x3133f8d75a1ac251!8m2!3d-33.8567844!4d151.2152967!16zL20vMDZfbm0?entry=ttu"
              className="card--header-mapUrl"
              target="_blank"
            >
              View on Google Maps
            </a>
          </header>
          <h1 className="card--title"> Sydney Opera House </h1>
          <p className="card--period"> 27 May, 2021 - 8 Jun, 2021 </p>
          <p className="card--story">
            {" "}
            The Sydney Opera House is a multi-venue performing arts centre in
            Sydney. Located on the banks of the Sydney Harbour, it is often
            regarded as one of the 20th centurys most famous and distinctive
            buildings.{" "}
          </p>
        </div>
      </div>
      <hr className="card--sepator" />
    </section>
  );
}

*/

export default function Card(props) {
  return (
    <section className="card">
      <div className="card--area">
        <img src={props.imgUrl} className="card--image" />
        <div className="card--description">
          <header className="card--header">
            <img src="./images/pin.png" className="card--header-pin" />
            <span className="card--header-country">{props.country}</span>
            <a
              href={props.mapsUrl}
              className="card--header-mapUrl"
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </a>
          </header>
          <h1 className="card--title"> {props.location} </h1>
          <p className="card--period"> {props.period} </p>
          <p className="card--story">{props.story}</p>
        </div>
      </div>
      <hr className="card--sepator" />
    </section>
  );
}
