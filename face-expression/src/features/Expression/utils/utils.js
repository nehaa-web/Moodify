import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, streamRef, videoRef }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  streamRef.current = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoRef.current.srcObject = streamRef.current;

  await videoRef.current.play();
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
  if (!landmarkerRef.current || !videoRef.current) {
    return;
  }

  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now(),
  );

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");

    const browUp = getScore("browInnerUp");

    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    const browDownLeft = getScore("browDownLeft");
    const browDownRight = getScore("browDownRight");
    const mouthPress = getScore("mouthPress");

    let currentExpression = "Neutral 😐";

    if (smileLeft > 0.5 && smileRight > 0.5) {
      currentExpression = "Happy 😄";
    } else if (
      browDownLeft > 0.3 &&
      browDownRight > 0.3 &&
      mouthPress > 0.2
    ) {
      currentExpression = "Angry 😠";
    } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
      currentExpression = "Sad 😢";
    }

    setExpression(currentExpression);
  }
};