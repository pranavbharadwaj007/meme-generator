import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
export default function Meme() {
  const [memes, setMemes] = useState([]);
  const [memeindex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const history = useHistory();
  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = memes[memeindex];
    const formData = new FormData();
    formData.append("username", "pranav777");
    formData.append("password", "rickyman");
    formData.append("template_id", currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData
    }).then((res) => {
      res.json().then((res) => {
        //console.log(res);
        if (res.data !== undefined) {
          history.push(`/generated?url=${res.data.url}`);
        }
      });
    });
  };
  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  //console.log(memeindex);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        const _memes = res.data.memes;
        shuffleMemes(_memes);
        setMemes(_memes);
      });
    });
  }, []);
  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeindex].box_count).fill(""));
    }
  }, [memeindex, memes]);

  // useEffect(() => {
  //   console.log(captions);
  // }, [captions]);
  return (
    <div className={styles.container}>
      {memes.length ? (
        <div>
          <button
            onClick={() => {
              generateMeme();
            }}
            className={styles.generate}
          >
            Generate
          </button>
          <button
            onClick={() => {
              setMemeIndex(memeindex + 1);
            }}
            className={styles.skip}
          >
            Skip
          </button>
          {captions.map((c, index) => {
            return (
              <input onChange={(e) => updateCaption(e, index)} key={index} />
            );
          })}
          <img src={memes[memeindex].url} alt={memes[0].name} />
        </div>
      ) : (
        <img
          src="https://acegif.com/wp-content/uploads/loading-38-gap.jpg"
          alt="Loading"
        />
      )}
    </div>
  );
}
