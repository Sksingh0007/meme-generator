import React from "react";
import { useState, useEffect } from "react";

const Main = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    // Fetching meme images from the API  
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setImage(data.data.memes))
    
  }, []);
  


  const [meme, setMeme] = useState({
    topText: "Once upon a time",
    bottomText: "there was a meme",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * image.length);
    const url = image[randomIndex]?.url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: url || prevMeme.imageUrl, // Fallback to previous image if undefined
    }));
  }

    function handleChange(event) {
      const { value, name } = event.currentTarget;
      setMeme((prevMeme) => ({
        ...prevMeme,
        [name]: value
      }))
    }

    return (
      <main>
        <div className="form">
          <label htmlFor="top">
            Top text:
            <input type="text" id="top" name="topText" placeholder="Top text" value={meme.topText} onChange={handleChange} />
          </label>
          <label htmlFor="bottom">
            Bottom text:
            <input type="text" id="bottom" name="bottomText" placeholder="Top text" value={meme.bottomText} onChange={handleChange} />
          </label>
          <button onClick={getRandomImage}>Get a new meme image 🖼</button>
        </div>
        <div className="meme">
          <img src={meme.imageUrl} alt="meme image" />
          <span className="top">{meme.topText}</span>
          <span className="bottom">{meme.bottomText}</span>
        </div>
      </main>
    );
  }

  export default Main;
