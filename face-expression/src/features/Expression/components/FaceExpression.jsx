//  import { useEffect, useRef, useState } from "react";
// import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// const getTimestamp = () => performance.now();

// export default function FaceExpression() {
//   const videoRef = useRef(null);
//   const landmarkerRef = useRef(null);
//   const animationRef = useRef(null);
//   const streamRef = useRef(null);

//   const [expression, setExpression] = useState("Detecting...");

//   // =========================
//   // 1. INITIALIZE
//   // =========================
//   const init = async () => {
//     try {
//       console.log("========== INIT START ==========");

//       console.log("1️⃣ Starting MediaPipe...");

//      const vision = await FilesetResolver.forVisionTasks(
//   "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm"
// );

//       console.log("2️⃣ Vision loaded ✅");
//       console.log("Vision:", vision);

//       // =========================
//       // 2. CREATE LANDMARKER
//       // =========================
//     landmarkerRef.current = await FaceLandmarker.createFromOptions(
//   vision,
//   {
//     baseOptions: {
//       modelAssetPath:
//         "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
//       delegate: "GPU", // agar issue rahe to "CPU" try karein
//     },
//     outputFaceBlendshapes: true,
//     runningMode: "VIDEO",
//     numFaces: 1,
//   }
// );

//       console.log("3️⃣ Landmarker created ✅");
//       console.log("Landmarker:", landmarkerRef.current);

//       // =========================
//       // 3. CAMERA
//       // =========================
//       console.log("4️⃣ Requesting camera permission...");

//       streamRef.current =
//         await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });

//       console.log("5️⃣ Camera permission granted ✅");
//       console.log("STREAM:", streamRef.current);

//       console.log(
//         "Camera tracks:",
//         streamRef.current.getVideoTracks()
//       );

//       // =========================
//       // 4. VIDEO
//       // =========================
//       if (!videoRef.current) {
//         console.error("❌ videoRef.current is NULL");
//         return;
//       }

//       console.log("6️⃣ Video element found ✅");
//       console.log("VIDEO:", videoRef.current);

//       videoRef.current.srcObject = streamRef.current;

//       console.log("7️⃣ Stream attached to video ✅");

//       // Wait for video metadata
//       await new Promise((resolve) => {
//         if (videoRef.current.readyState >= 1) {
//           console.log("8️⃣ Video metadata already loaded");
//           resolve();
//         } else {
//           videoRef.current.onloadedmetadata = () => {
//             console.log("8️⃣ Video metadata loaded ✅");
//             resolve();
//           };
//         }
//       });

//       console.log("Video Width:", videoRef.current.videoWidth);
//       console.log("Video Height:", videoRef.current.videoHeight);
//       console.log("Video ReadyState:", videoRef.current.readyState);

//       await videoRef.current.play();

//       console.log("9️⃣ Video playing ✅");
//       console.log("Video paused:", videoRef.current.paused);
//       console.log("Video readyState:", videoRef.current.readyState);

//       console.log("========== INIT COMPLETE ==========");
//     } catch (error) {
//       console.error("🔥 INIT ERROR:", error);
//       console.error("Error name:", error?.name);
//       console.error("Error message:", error?.message);
//     }
//   };

//   // =========================
//   // 5. DETECT
//   // =========================
//   const detect = () => {
//     console.log("========== DETECT START ==========");

//     console.log("🔵 Landmarker:", landmarkerRef.current);
//     console.log("🔵 Video:", videoRef.current);

//     if (!landmarkerRef.current) {
//       console.error("❌ Landmarker is NOT ready");
//       return;
//     }

//     if (!videoRef.current) {
//       console.error("❌ Video element is NOT ready");
//       return;
//     }

//     console.log("Video Width:", videoRef.current.videoWidth);
//     console.log("Video Height:", videoRef.current.videoHeight);
//     console.log("Video ReadyState:", videoRef.current.readyState);
//     console.log("Video Paused:", videoRef.current.paused);
//     console.log("Video CurrentTime:", videoRef.current.currentTime);

//     if (
//       videoRef.current.videoWidth === 0 ||
//       videoRef.current.videoHeight === 0
//     ) {
//       console.error("❌ Video has no dimensions");
//       return;
//     }

//     console.log("🔍 Running detectForVideo...");

//     try {
//       const results = landmarkerRef.current.detectForVideo(
//         videoRef.current,
//         getTimestamp()
//       );

//       console.log("✅ RESULT:", results);

//       console.log(
//         "Face Landmarks:",
//         results.faceLandmarks
//       );

//       console.log(
//         "Face Blendshapes:",
//         results.faceBlendshapes
//       );

//       console.log(
//         "Transformation Matrix:",
//         results.facialTransformationMatrixes
//       );

//       // =========================
//       // 6. FACE CHECK
//       // =========================
//       if (
//         results.faceBlendshapes &&
//         results.faceBlendshapes.length > 0
//       ) {
//         console.log("🎉 FACE DETECTED ✅");

//         const blendshapes =
//           results.faceBlendshapes[0].categories;

//         console.log(
//           "Blendshape categories:",
//           blendshapes
//         );

//         const getScore = (name) => {
//           const item = blendshapes.find(
//             (b) => b.categoryName === name
//           );

//           console.log(
//             `Score for ${name}:`,
//             item?.score
//           );

//           return item?.score || 0;
//         };

//         const smileLeft = getScore("mouthSmileLeft");
//         const smileRight = getScore("mouthSmileRight");

//         const jawOpen = getScore("jawOpen");
//         const browUp = getScore("browInnerUp");

//         const frownLeft = getScore("mouthFrownLeft");
//         const frownRight = getScore("mouthFrownRight");

//         console.log("😊 smileLeft:", smileLeft);
//         console.log("😊 smileRight:", smileRight);
//         console.log("😮 jawOpen:", jawOpen);
//         console.log("😮 browUp:", browUp);
//         console.log("😢 frownLeft:", frownLeft);
//         console.log("😢 frownRight:", frownRight);

//         // =========================
//         // 7. EXPRESSION
//         // =========================
//         let currentExpression = "Neutral 😐";

//         if (smileLeft > 0.5 && smileRight > 0.5) {
//           currentExpression = "Happy 😄";
//         } else if (jawOpen > 0.6 && browUp > 0.5) {
//           currentExpression = "Surprised 😲";
//         } else if (
//           frownLeft > 0.08 &&
//           frownRight > 0.08
//         ) {
//           currentExpression = "Sad 😢";
//         }

//         console.log(
//           "🎭 Detected Expression:",
//           currentExpression
//         );

//         setExpression(currentExpression);
//       } else {
//         console.warn("❌ NO FACE DETECTED");

//         setExpression("No face detected 👀");
//       }
//     } catch (error) {
//       console.error("🔥 DETECTION ERROR:", error);
//     }

//     console.log("========== DETECT END ==========");
//   };

//   // =========================
//   // 8. USE EFFECT
//   // =========================
//   useEffect(() => {
//     console.log("🚀 useEffect running");

//     init();

//     return () => {
//       console.log("🧹 CLEANUP RUNNING");

//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//         console.log("🛑 Animation cancelled");
//       }

//       if (landmarkerRef.current) {
//         landmarkerRef.current.close();
//         console.log("🧹 Landmarker closed");
//       }

//       if (streamRef.current) {
//         console.log("🧹 Stopping camera tracks");

//         streamRef.current
//           .getTracks()
//           .forEach((track) => {
//             console.log(
//               "Stopping track:",
//               track.kind,
//               track.label
//             );

//             track.stop();
//           });
//       }
//     };
//   }, []);

//   // =========================
//   // 9. UI
//   // =========================
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "15px",
//       }}
//     >
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         style={{
//           width: "400px",
//           height: "300px",
//           objectFit: "cover",
//           borderRadius: "12px",
//         }}
//       />

//       <h2>{expression}</h2>

//       <button onClick={detect}>
//         Detect Expression
//       </button>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { detect , init } from "../utils/utils";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
   const streamRef = useRef(null);

  // let stream;
  const [expression, setExpression] = useState("Detecting...");
 
  useEffect(() => {
    init({landmarkerRef, streamRef, videoRef});

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
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
        playsInline
      />

      <h2>{expression}</h2>
      <button onClick={()=> {detect({ landmarkerRef, videoRef , setExpression})}}>Detect Expression </button>
    </div>
  );
}
