import { useState, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

import HeaderTop from "../components/HeaderTop";
import Footer from "../components/footer";

/**this is just for testing purpose */
// import AudioDefault from "../public/utils/default.mp3";

//icons
import { PlayArrow, Pause, Stop } from "@material-ui/icons";

export default function Home(props) {
   const audioPlayer = useRef();

   const [value, setValue] = useState("");
   const [playing, setPlaying] = useState(false);
   const [audio, setAudio] = useState(false);
   const [audioSrc, setAudioSrc] = useState("");
   const [resObj, setResObj] = useState([]);
   const [currentTime, setCurrentTime] = useState(0);
   const [seekValue, setSeekValue] = useState(0);
   const [audioPlay] = useState(
      typeof Audio !== "undefined" && new Audio(audioSrc)
   );
   const [loading, setLoading] = useState(false);
   //https://v1.api.audio/url/72db3/default.mp3
   //https://v1.api.audio/url/1c22c5/default.mp3
   const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const data = {
         value
      };
      // console.log(data);
      try {
         const res = await axios.post(process.env.NEXT_PUBLIC_API, data);
         console.log("this is res.data" + res.data);
         if (res.data.status === "success") {
            setAudio(true);
            setResObj(res.data.data);
            setAudioSrc(res.data.data.url);
         }
         console.log(audioSrc);
         setLoading(false);
      } catch (err) {
         console.log(err.message);
         setLoading(false);
      }
   };

   const play = () => {
      audioPlayer.current.play();
      // audioPlayer.current.src = audioSrc;
      setPlaying(true);
   };

   const onPause = () => {
      audioPlayer.current.pause();
      // audioPlayer.current.src = audioSrc;
      setPlaying(false);
   };

   const stop = () => {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
   };

   const setSpeed = (speed) => {
      audioPlayer.current.playbackRate = speed;
   };

   const onPlaying = () => {
      setCurrentTime(audioPlayer.current.currentTime);
      setSeekValue(
         (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
      );
   };
   return (
      <div className={"container"}>
         <Head>
            <title>text to speech</title>
            <meta
               name="description"
               content="a simple web app to convert text to speech!"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <HeaderTop />
         <main className="main-section">
            <form
               noValidate
               onSubmit={(e) => onSubmit(e)}
               className="main_form"
            >
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
                  <button className="main-btn">
                     {loading ? "please wait..." : "convert"}
                  </button>
               </div>
            </form>
            {/* {console.log(audioSrc)} */}
            {audio && (
               <div className="audio">
                  <p>
                     <span style={{ fontSize: "14px", color: "white" }}>
                        here is a link to download your audio
                     </span>
                     <a
                        className="header-icon_link"
                        href={audioSrc}
                     >
                        <h2 className={"header-icon_txt"}>{audioSrc}</h2>
                     </a>
                  </p>
                  <>
                     <audio
                        src={audioSrc}
                        ref={audioPlayer}
                        // src={AudioDefault}
                        onTimeUpdate={onPlaying}
                     >
                        Your browser does not support the
                        <code>audio</code> element.
                     </audio>
                     <br />
                     <p>{currentTime}</p>
                     <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={seekValue}
                        className="audio-input"
                        onChange={(e) => {
                           const seekto =
                              audioPlayer.current.duration *
                              (+e.target.value / 100);
                           audioPlayer.current.currentTime = seekto;
                           setSeekValue(e.target.value);
                        }}
                     />
                     <div className="icons">
                        <button
                           onClick={() => setSpeed(0.5)}
                           className="audio-font"
                        >
                           0.5x
                        </button>
                        <button
                           onClick={() => setSpeed(1)}
                           className="audio-font"
                        >
                           1x
                        </button>
                        <button onClick={stop}>
                           <Stop className="audio-icon" />
                        </button>
                        <div className="center">
                           <button
                           >
                              {playing ? (
                                 <Pause
                                    onClick={onPause}
                                    className="audio-icon"
                                 />
                              ) : (
                                 <PlayArrow
                                    onClick={play}
                                    className="audio-icon"
                                 />
                              )}
                           </button>
                        </div>
                        <button
                           className="audio-font"
                           onClick={() => setSpeed(1.5)}
                        >
                           1.5x
                        </button>
                        <button
                           className="audio-font"
                           onClick={() => setSpeed(2)}
                        >
                           2x
                        </button>
                     </div>
                  </>
               </div>
            )}
         </main>
         <Footer />
      </div>
   );
}
