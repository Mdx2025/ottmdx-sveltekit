import fetchProgress from "fetch-progress";
import { launchApp } from "./loader";

const counter = document.querySelector("#counter");
const videos = [document.querySelector(".hero-video > .video > video"), document.querySelector(".video-wrapper > video")];
const videosURLS = videos.map((video) => video.firstElementChild.dataset.src);
let percentageLoaded = 0;
let appLaunched = false;

function updateProgress(nextValue) {
  const safeValue = Math.min(100, Math.max(0, Math.round(nextValue)));
  if (safeValue <= percentageLoaded) return;

  percentageLoaded = safeValue;
  window.od?.update(percentageLoaded);

  if (percentageLoaded >= 100 && !appLaunched) {
    appLaunched = true;
    launchApp();
  }
}

export function downloadMedia() {
  try {
    Promise.all(
      videosURLS.map((url, index) => {
        const promise = fetch(url)
          .then(
            fetchProgress({
              onProgress(progress) {
                updateProgress(progress.percentage);
              },
              onError(err) {
                console.log(err);
              },
            })
          )
          .then((r) => r.blob())
          .then((src) => {
            videos[index].src = URL.createObjectURL(src);
            if (import.meta.env.PROD) videos[index].play();
          });

        return promise;
      })
    ).then(() => {
      updateProgress(100);
    });
  } catch (error) {
    throw new Error("Error downloading media: " + error.message);
  }
}
