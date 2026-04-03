import fetchProgress from "fetch-progress";
import { launchApp } from "./loader";

const counter = document.querySelector("#counter");
const videos = [document.querySelector(".hero-video > .video > video"), document.querySelector(".video-wrapper > video")];
const videosURLS = videos.map((video) => video.firstElementChild.dataset.src);
const videosTotals = [];
let percentageLoaded = 0;

export function downloadMedia() {
  try {
    Promise.all(
      videosURLS.map((url, index) => {
        const promise = fetch(url)
          .then(
            fetchProgress({
              onProgress(progress) {
                if (percentageLoaded >= progress.percentage) return;
                percentageLoaded = progress.percentage;

                if ((percentageLoaded == 10 && percentageLoaded == 15) || percentageLoaded == 18 || percentageLoaded == 27 || percentageLoaded == 33 || percentageLoaded == 45 || percentageLoaded == 57 || percentageLoaded == 68 || percentageLoaded == 75 || percentageLoaded == 82 || percentageLoaded == 87 || percentageLoaded == 93 || percentageLoaded == 97 || percentageLoaded == 100) {
                  setTimeout(() => {
                    window.od.update(percentageLoaded);
                    if (percentageLoaded == 100) launchApp();
                  }, 1000);
                }
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
    );
  } catch (error) {
    throw new Error("Error downloading media: " + error.message);
  }
}
