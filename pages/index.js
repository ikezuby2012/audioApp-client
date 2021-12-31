import { useState } from "react";
import axios from "axios";
import Head from 'next/head';
import Link from 'next/link';

import HeaderTop from "../components/HeaderTop";
import Footer from "../components/footer";
import { audioApi } from "../components/api";

//icons
import { PlayArrow, Pause } from "@material-ui/icons";

export default function Home(props) {
  const [value, setValue] = useState("");
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [resObj, setResObj] = useState([]);
  const [audioPlay] = useState(typeof Audio !== "undefined" && new Audio(audioSrc));
  //https://v1.api.audio/url/72db3/default.mp3
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(value)
    const body = value
    const res = await axios.post(process.env.NEXT_PUBLIC_API, {
      body: value
    });
    let { data } = res;
    console.log(data.data);
    if (data) {
      console.log(data.data.url);
      setAudio(true);
      setResObj(data.data);
      setAudioSrc(JSON.stringify(data.data.url));
    }
    console.log(resObj);
  }

  const playAudio = () => {
    setPlaying(true);
    audioPlay.play();
  }

  const pauseAudio = () => {
    setPlaying(false);
    audioPlay.pause();
  }
  return (
    <div className={"container"}>
      <Head>
        <title>text to speech</title>
        <meta name="description" content="a simple web app to convert text to speech!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderTop />
      <main className="main-section">
        <form noValidate onSubmit={(e) => onSubmit(e)}
          className="main_form">
          <div className="main_form-flex">
            <textarea
              required
              className="main-textarea"
              placeholder="Enter Your text"
              id="message"
              name="message"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="main-btn">convert</button>
          </div>
        </form>
        {console.log(audioSrc)}
        {audio && <div className="">
          <p>
            <span style={{fontSize: "14px", color: "white"}}>here is a link to your audio</span>
            <Link href="/">
              <a className="header-icon_link">
                <h2 className={"header-icon_txt"}>{audioSrc}</h2>
              </a>
            </Link>
          </p>
          {playing ?
            <div>
              <button onClick={pauseAudio}>
                <Pause />
              </button>
            </div>
            : <div>
              <button onClick={playAudio}>
                <PlayArrow />
              </button>
            </div>}
        </div>}
      </main>
      <Footer />
    </div>
  )
}

