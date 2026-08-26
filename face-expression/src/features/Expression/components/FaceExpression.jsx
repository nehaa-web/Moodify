import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  let stream;
  const [expression, setExpression] = useState("Detecting...");

  // 1. Initialize MediaPipe + Camera
  const init = async () => {
    try {
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

      // Camera
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      // Start detection
      detect();
    } catch (error) {
      console.error("Face Expression Error:", error);
    }
  };

  // 2. Detect Face
  const detect = () => {
    if (!landmarkerRef.current || !videoRef.current) {
    return;
  }

  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    timestamp
  );

    // 3. Check if face exists
    if (results.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;

      // 4. Get score
      const getScore = (name) =>
        blendshapes.find((item) => item.categoryName === name)?.score || 0;

      const smileLeft = getScore("mouthSmileLeft");
      const smileRight = getScore("mouthSmileRight");

      const jawOpen = getScore("jawOpen");
      const browUp = getScore("browInnerUp");

      const frownLeft = getScore("mouthFrownLeft");
      const frownRight = getScore("mouthFrownRight");

      // 5. Detect expression
      let currentExpression = "Neutral 😐";

      if (smileLeft > 0.5 && smileRight > 0.5) {
        currentExpression = "Happy 😄";
      } else if (jawOpen > 0.6 && browUp > 0.5) {
        currentExpression = "Surprised 😲";
      } else if (frownLeft > 0.08 && frownRight > 0.08) {
        currentExpression = "Sad 😢";
      }

      setExpression(currentExpression);
    } else {
      setExpression("No face detected 👀");
    }

    // 6. Keep detecting
    animationRef.current = requestAnimationFrame(detect);
    
  };
  useEffect(() => {
    // Start
    // init();

    // 7. Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{
          width: "400px",
          borderRadius: "12px",
        }}
        autoPlay
        playsInline
        muted
      />

      <h2>{expression}</h2>
      <button onClick={detect}>detect expression</button>
    </div>
  );
}
