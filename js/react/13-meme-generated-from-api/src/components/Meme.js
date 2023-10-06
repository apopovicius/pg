import React from "react";

export default function Meme() {
  const [allMemes, setAllMemes] = React.useState([]);
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data));

    // you cant make this effect function async
    // because this function needs to return a function,
    // that will be cleanup for this effect and thats not async(not returning a promise)
    //const res = await fetch("https://api.imgflip.com/get_memes")
    //const data = await res.json()
    //setAllMemes(data.data.memes)
    return () => {};
  }, []); // will run this only once therefore empty array dep

  // how to work with async/await
  //React.useEffect(() => {
  //  async function getMemes() {
  //    const res = await fetch("https://api.imgflip.com/get_memes");
  //    const data = await res.json();
  //    setAllMemes(data.data.memes);
  //  }
  //  getMemes();
  //}, []);

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMemeImage() {
    const memesArray = allMemes.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
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
