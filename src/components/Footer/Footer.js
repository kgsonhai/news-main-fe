import React, { useState, useRef } from "react";
import TimeSlider from "react-input-slider";

import "./Footer.css";
import PrevIcon from "../icons/PrevIcon";
import NextIcon from "../icons/NextIcon";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";

export const Footer = ({ audios }) => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      // audioRef.current.play();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          audioRef.current.play();
        });
      }
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  if (!audios) return null;
  if (audios.length === 0) return null;

  return (
    <div className="Footer">
      <div className="Control-Button-Group">
        <div
          className="Prev-Button"
          onClick={() => setAudioIndex((audioIndex - 1) % audios.length)}
        >
          <PrevIcon />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {isPlay ? <PauseIcon /> : <PlayIcon />}
        </div>
        <div
          className="Next-Button"
          onClick={() => setAudioIndex((audioIndex + 1) % audios.length)}
        >
          <NextIcon />
        </div>
      </div>
      <TimeSlider
        axis="x"
        xmax={duration}
        x={currentTime}
        onChange={handleTimeSliderChange}
        styles={{
          track: {
            backgroundColor: "#e3e3e3",
            height: "2px",
          },
          active: {
            backgroundColor: "#333",
            height: "2px",
          },
          thumb: {
            marginTop: "-3px",
            width: "8px",
            height: "8px",
            backgroundColor: "#333",
            borderRadius: 0,
          },
        }}
      />
      <audio
        ref={audioRef}
        src={audios[audioIndex].src}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => {
          setAudioIndex((audioIndex + 1) % audios.length);
        }}
      />
    </div>
  );
};
