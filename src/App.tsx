import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { MediaPlayer } from "dashjs";
import "./App.css";

const json =
  '[{"title": "Envivio","url": "https://dash.akamaized.net/envivio/Envivio-dash2/manifest.mpd"},{"title": "Big buck bunny","url": "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"},{"title": "The hero","url": "https://dash.akamaized.net/digitalprimates/fraunhofer/480p_video/heaac_2_0_with_video/Sintel/sintel_480p_heaac2_0.mpd"}]';
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function App() {
  const videoElementRef: LegacyRef<HTMLVideoElement> | null = useRef(null);
  const player = useRef<dashjs.MediaPlayerClass>();
  const [listPos, setListPos] = useState(0);
  const [videoList, setVideoList] = useState<
    { title: string; url: string }[] | never[]
  >([]);
  const [shouldShowTitle, setShouldShowTitle] = useState(false);

  useEffect(() => {
    const result = JSON.parse(json);
    setVideoList(result);
  }, []);

  useEffect(() => {
    player.current = MediaPlayer().create();
  }, []);

  useEffect(() => {
    videoElementRef.current?.addEventListener("ended", (event) => {
      setListPos(listPos + 1);
    });
    return () => {
      videoElementRef.current?.removeEventListener("ended", (event) => {
        setListPos(listPos + 1);
      });
    };
  }, [listPos]);

  useEffect(() => {
    if (
      videoElementRef.current &&
      player.current &&
      videoList.length > 0 &&
      listPos < videoList.length
    )
      player.current.initialize(
        videoElementRef.current,
        videoList[listPos].url,
        false
      );

    return () => {
      // second;
    };
  }, [listPos, videoList]);

  useEffect(() => {
    if (player.current) {
      player.current.on("manifestLoaded", (event) => {
        player.current?.pause();
        setShouldShowTitle(true);
        delay(3000).then(() => {
          player.current?.play();
          setShouldShowTitle(false);
        });
      });
    }

    return () => {};
  }, []);

  return (
    <div className="App">
        <div className="videoElementWrapper">
          {listPos < videoList.length && shouldShowTitle && (
            <div className="titleElement">{videoList[listPos]?.title}</div>
          )}
          <video
            className="videoElementStyles"
            id="videoElement"
            ref={videoElementRef}
            controls
          />
        </div>
    </div>
  );
}

export default App;
