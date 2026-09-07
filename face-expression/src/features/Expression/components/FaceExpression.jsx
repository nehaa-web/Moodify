import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  // let stream;
  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, streamRef, videoRef });

    // Cleanup
    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick({ onClick }) {
    const expression = detect({ landmarkerRef, videoRef, setExpression });
    console.log(expression);
    onClick(expression);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-4 flex h-[500px] w-[450px] max-w-[calc(100%-1rem)] flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-white to-pink-500 p-3 shadow-2xl shadow-black">
        <h1 className="text-black text-2xl font-serif font-bold">
          💮Expression Capture 💮
        </h1>

        <div
          className="border-4 shadow-lg shadow-white bg-black overflow-hidden"
          style={{
            width: "400px",
            height: "300px",
            borderRadius: "12px",
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
          />
        </div>

        <h2 className="text-2xl font-bold [-webkit-text-stroke:1px_black]">
          {expression}
        </h2>
        <button
          className="!p-7 !mt-5 border-x-2 rounded-2xl  !text-black active:scale-90 transition-all !py-1  bg-gradient-to-r from-white to-pink-500 text-white "
          onClick={handleClick}
        >
          Detect Your Current Mood{" "}
        </button>
      </div>
    </div>
  );
}
