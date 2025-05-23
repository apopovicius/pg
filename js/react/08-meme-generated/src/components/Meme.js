import React from "react";
import memesData from "../memesData.js";

export default function Meme() {
  function getMemeImage() {
    const memesArray = allMememImages.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMememImages, setAllMemeImages] = React.useState(memesData);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="form--input"
          placeholder="Top text"
          name="topText"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          type="text"
          className="form--input"
          placeholder="Buttom text"
          name="bottomText"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        {meme.topText && <h2 className="meme--text top">{meme.topText}</h2>}
        {meme.bottomText && (
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        )}
      </div>
    </main>
  );
}
