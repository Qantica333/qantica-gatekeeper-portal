import React, { useEffect, useMemo, useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type Platform = {
  name: string;
  src: string;
  style: React.CSSProperties;
};

const PLATFORMS: Platform[] = [
  { name: "TikTok",     src: "/public/logos/Prime_Video.svg",     style: { top: "-32px", left: "50%", transform: "translateX(-50%)" } },
  { name: "Instagram",  src: "/logos/instagram.svg",  style: { top: "50%", right: "-32px", transform: "translateY(-50%)" } },
  { name: "Reddit",     src: "/logos/reddit.svg",     style: { bottom: "25px", right: "25px" } },
  { name: "Roblox",     src: "/logos/roblox.svg",     style: { bottom: "-32px", left: "50%", transform: "translateX(-50%)" } },
  { name: "Netflix",    src: "/logos/netflix.svg",    style: { top: "50%", left: "-32px", transform: "translateY(-50%)" } },
  { name: "YouTube",    src: "/logos/youtube.svg",    style: { bottom: "25px", left: "25px" } },
  { name: "Paramount",  src: "/logos/paramount.svg",  style: { top: "25px", right: "25px" } },
  { name: "Disney+",    src: "/logos/disneyplus.svg", style: { top: "25px", left: "25px" } },
];

const TOOLS = [
  { name: "SORA",      src: "/logos/sora.svg",       delay: "0s" },
  { name: "GROK",      src: "/logos/grok.svg",       delay: "2.5s" },
  { name: "RUNWAY",    src: "/logos/runway.svg",     delay: "5s" },
  { name: "GEMINI",    src: "/logos/gemini.svg",     delay: "7.5s" },
  { name: "X",         src: "/logos/x.svg",          delay: "10s" },
  { name: "HIGGFIELD", src: "/logos/higgfield.svg",  delay: "12.5s" },
  { name: "IA's",      src: "/logos/ai-generic.svg", delay: "15s" },
];

const QanticaCenter: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver();
  const [isMoving, setIsMoving] = useState(false);

  // Vía: generamos las traviesas en función del ancho
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const onResize = () => setTick(Date.now());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const sleepers = useMemo(() => {
    const w = trackRef.current?.offsetWidth ?? 0;
    const n = Math.max(8, Math.floor(w / 50));
    return Array.from({ length: n }, (_, i) => (i * 50) + 10 + (tick ? 0 : 0));
  }, [trackRef.current?.offsetWidth, tick]);

  const handleStart = () => {
    setIsMoving(false);
    requestAnimationFrame(() => {
      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 8000);
    });
  };

  return (
    <section ref={elementRef} className="min-h-[80vh] flex items-center py-16">
      <div className={`w-full transition-all duration-500 px-4 sm:px-6 lg:px-8 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="max-w-6xl mx-auto">
          {/* Título (como en tu HTML final) */}
          <h1 className="text-4xl md:text-5xl font-black mb-8 uppercase text-center" style={{ color: "#FFD700" }}>
            QANTICA MAKES CREATOR'S WISH LIST A REALITY
          </h1>

          {/* Botón */}
          <div className="flex justify-center">
            <button
              onClick={handleStart}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 mb-8 z-50"
              disabled={isMoving}
            >
              {isMoving ? "In Flight..." : "ACTIVATE QANTICA"}
            </button>
          </div>

          {/* Escena */}
          <div className="relative w-full max-w-6xl h-[450px] flex items-center mx-auto">
            {/* Vía */}
            <div ref={trackRef} className="track-container absolute bottom-[30%] left-0 right-0 h-10 z-5 flex items-end">
              <div className="rail absolute w-full h-[6px] bg-yellow-400 top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
              {sleepers.map((left, i) => (
                <div
                  key={i}
                  className="sleeper"
                  style={{
                    position: "absolute",
                    width: 30,
                    height: 8,
                    backgroundColor: "#222222",
                    borderTop: "1px solid #444",
                    top: "50%",
                    transform: "translateY(-50%) rotate(90deg)",
                    left,
                    zIndex: 1,
                  }}
                />
              ))}
            </div>

            {/* IZQUIERDA: Ecosistema IA */}
            <div
              className={`ia-ecosystem-container absolute w-[400px] h-[400px] rounded-full border-2 border-dashed border-yellow-400 shadow-[0_0_30px_rgba(255,215,0,0.7)] left-[50px] top-[25px] ${
                isMoving ? "animate-[move-to-q_8s_ease-in-out_forwards]" : ""
              }`}
              style={{ zIndex: 10 }}
            >
              {/* CREATOR */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 30 }}>
                <div className="bg-yellow-400 p-6 rounded-xl shadow-2xl border-4 border-yellow-600 flex flex-col items-center justify-center space-y-1 w-[120px] h-[100px]">
                  <svg className="w-10 h-10 fill-black block mx-auto" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <p className="text-xs font-extrabold text-black uppercase">CREATOR</p>
                </div>
              </div>

              {/* Herramientas orbitando con LOGOS */}
              {TOOLS.map((t, idx) => (
                <div
                  key={idx}
                  className="creator-tool-sphere"
                  style={{
                    animation: `orbit 18s linear infinite`,
                    animationDelay: t.delay,
                  }}
                  title={t.name}
                >
                  <img
                    src={t.src}
                    alt={t.name}
                    style={{ width: "70%", height: "70%", objectFit: "contain", display: "block", margin: "auto", pointerEvents: "none" }}
                  />
                </div>
              ))}
            </div>

            {/* DERECHA: Q + Plataformas */}
            <div
              className={`q-destination absolute flex items-center justify-center ${isMoving ? "animate-[q-destination-move_8s_ease-in-out_forwards]" : ""}`}
              style={{ right: 40, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
            >
              <div className="relative w-96 h-96 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-full p-2">
                <div className="absolute w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center text-5xl font-black text-gray-900 shadow-2xl border-4 border-yellow-300">
                  Q
                </div>

                {PLATFORMS.map((p, i) => (
                  <div
                    key={i}
                    className="platform-sphere absolute w-16 h-16 rounded-full flex items-center justify-center"
                    style={p.style}
                    title={p.name}
                  >
                    <img
                      src={p.src}
                      alt={p.name}
                      style={{ width: "70%", height: "70%", objectFit: "contain", display: "block", margin: "auto", pointerEvents: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Texto descriptivo (inglés) */}
          <p className="mt-16 text-gray-400 text-center max-w-lg mx-auto">
            The Creator (human figure) advances equipped with <b>AI</b> tools towards the <b>Q</b> (Connection/Quality) and distribution platforms.
          </p>
        </div>
      </div>

      {/* Keyframes y estilos que estaban en el <style> del HTML */}
      <style>{`
        body {
          background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        .platform-sphere {
          background-color: black;
          border: 2px solid white;
          color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          animation: pulse 2s infinite ease-in-out;
        }
        .platform-sphere:hover {
          transform: scale(1.2) rotate(5deg);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.9);
          animation: none;
        }
        .creator-tool-sphere {
          background-color: rgba(0, 0, 0, 0.8);
          border: 2px solid #FFD700;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: bold;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 25;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
          cursor: help;
          transition: transform 0.2s ease;
        }
        .creator-tool-sphere:hover { transform: scale(1.2); }
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes move-to-q {
          0% { left: 50px; transform: scale(1); }
          100% { left: 300px; transform: scale(1.05); }
        }
        @keyframes q-destination-move {
          0% { right: 40px; }
          100% { right: 290px; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 5px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.7); }
          100% { box-shadow: 0 0 5px rgba(255,255,255,0.2); }
        }
      `}</style>
    </section>
  );
};

export default QanticaCenter;
