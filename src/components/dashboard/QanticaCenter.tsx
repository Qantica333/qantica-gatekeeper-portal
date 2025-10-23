import React, { useEffect, useMemo, useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const platforms = [
  { name: "Prime", src: "/public/logos/Prime_Video.svg", style: { top: "-32px", left: "50%", transform: "translateX(-50%)" } },
  { name: "Instagram", src: "/public/logos/instagram.svg", style: { top: "50%", right: "-32px", transform: "translateY(-50%)" } },
  { name: "Reddit", src: "/public/logos/reddit.svg", style: { bottom: "25px", right: "25px" } },
  { name: "Roblox", src: "/public/logos/roblox.svg", style: { bottom: "-32px", left: "50%", transform: "translateX(-50%)" } },
  { name: "Netflix", src: "/public/logos/netflix.svg", style: { top: "50%", left: "-32px", transform: "translateY(-50%)" } },
  { name: "YouTube", src: "/public/logos/youtube.svg", style: { bottom: "25px", left: "25px" } },
  { name: "Paramount", src: "/public/logos/paramount.svg", style: { top: "25px", right: "25px" } },
  { name: "Disney+", src: "/public/logos/disneyplus.svg", style: { top: "25px", left: "25px" } },
];

const tools = [
  { name: "Sora", src: "/public/logos/sora.svg", delay: "0s" },
  { name: "Grok", src: "/public/logos/grok.svg", delay: "2.5s" },
  { name: "Runway", src: "/public/logos/runway.svg", delay: "5s" },
  { name: "Gemini", src: "/public/logos/gemini.svg", delay: "7.5s" },
  { name: "X", src: "/public/logos/x.svg", delay: "10s" },
  { name: "Higgfield", src: "/public/logos/higgfield.svg", delay: "12.5s" },
  { name: "IAs", src: "/public/logos/ai-generic.svg", delay: "15s" },
];

const QanticaCenter: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver();
  const [isMoving, setIsMoving] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const sleepers = useMemo(() => {
    const width = trackRef.current?.offsetWidth ?? 0;
    const n = Math.max(8, Math.floor(width / 50));
    return Array.from({ length: n }, (_, i) => (i * 50) + 10);
  }, [trackRef.current?.offsetWidth]);

  useEffect(() => {
    const onResize = () => {
      // fuerza un rerender para recalcular sleepers mediante el useMemo
      // (cambiando width del contenedor provoca nueva referencia)
      // truco: set state a un valor timestamp
      setTick(Date.now());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const [, setTick] = useState<number>(0);

  const handleStart = () => {
    setIsMoving(false);
    // reflow no es necesario en React; basta togglear estado
    requestAnimationFrame(() => {
      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 8000);
    });
  };

  return (
    <section
      ref={elementRef}
      className="min-h-[80vh] flex items-center py-16"
    >
      <div
        className={`w-full transition-all duration-500 px-4 sm:px-6 lg:px-8 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-2xl sm:text-3xl md:text-4xl text-white font-light leading-relaxed tracking-wide">
              However, we believe{" "}
              <span className="text-white font-medium">
                <span className="text-yellow-400">Q</span>ANTICA
              </span>{" "}
              can be at the{" "}
              <span className="text-yellow-400 font-medium">center</span>{" "}
              of the industry
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mt-4 font-light">
              with the ability to interact with all participants
            </p>
          </div>

          {/* ---- ANIMACIÓN ---- */}
          <div className="relative w-full max-w-6xl h-[450px] mx-auto flex items-center justify-center overflow-visible">
            <button
              onClick={handleStart}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 mb-8 absolute -top-10 z-50"
            >
              {isMoving ? "En viaje..." : "ACTIVAR QANTICA"}
            </button>

            {/* Vía */}
            <div ref={trackRef} className="track-container absolute bottom-[30%] left-0 right-0 h-10 z-5 flex items-end">
              <div className="rail absolute w-full h-[6px] bg-yellow-400 top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
              {sleepers.map((left, idx) => (
                <div
                  key={idx}
                  className="sleeper"
                  style={{
                    position: "absolute",
                    width: 30,
                    height: 8,
                    backgroundColor: "#222",
                    borderTop: "1px solid #444",
                    top: "50%",
                    transform: "translateY(-50%) rotate(90deg)",
                    left,
                    zIndex: 1,
                  }}
                />
              ))}
            </div>

            {/* Contenedor izquierdo (Creador + herramientas orbitando) */}
            <div
              className={`ia-ecosystem-container absolute w-[400px] h-[400px] rounded-full border-2 border-dashed border-yellow-400 shadow-[0_0_30px_rgba(255,215,0,0.7)] left-[50px] top-[25px] ${
                isMoving ? "animate-[move-to-q_8s_ease-in-out_forwards]" : ""
              }`}
              style={{ zIndex: 10 }}
            >
              {/* Vagon/creador */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="bg-yellow-400 p-6 rounded-xl shadow-2xl border-4 border-yellow-600 flex flex-col items-center justify-center space-y-1 w-[120px] h-[100px]">
                  <svg className="w-10 h-10 fill-black block mx-auto" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <p className="text-xs font-extrabold text-black uppercase">CREADOR</p>
                </div>
              </div>

              {/* Esferas orbitando (logos herramientas) */}
              {tools.map((t, i) => (
                <div
                  key={i}
                  className="creator-tool-sphere"
                  style={{
                    animation: `orbit 18s linear infinite`,
                    animationDelay: t.delay,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "2px solid #FFD700",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 10px rgba(255,215,0,0.6)",
                    cursor: "help",
                    zIndex: 25,
                  }}
                  title={t.name}
                >
                  {/* Fallback: si no carga el logo, queda el círculo vacío */}
                  <img src={t.src} alt={t.name} style={{ width: "70%", height: "70%", objectFit: "contain", pointerEvents: "none" }} />
                </div>
              ))}
            </div>

            {/* Contenedor derecho (Q + plataformas) */}
            <div
              className={`q-destination absolute flex items-center justify-center ${
                isMoving ? "animate-[q-destination-move_8s_ease-in-out_forwards]" : ""
              }`}
              style={{ right: 40, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
            >
              <div className="relative w-96 h-96 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-full p-2">
                <div className="absolute w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center text-5xl font-black text-gray-900 shadow-2xl border-4 border-yellow-300">
                  Q
                </div>

                {platforms.map((p, i) => (
                  <div
                    key={i}
                    className="platform-sphere absolute w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      ...p.style,
                      backgroundColor: "black",
                      border: "2px solid white",
                      boxShadow: "0 0 0 rgba(0,0,0,0)",
                      animation: "pulse 2s infinite ease-in-out",
                    }}
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

          <p className="mt-16 text-gray-400 text-center max-w-lg mx-auto">
            El Creador avanza equipado con herramientas de <b>IA</b> hacia la <b>Q</b> (Conexión/Calidad) y las plataformas de distribución.
          </p>
        </div>
      </div>

      {/* --- Estilos/Keyframes (puedes moverlos a tu CSS global) --- */}
      <style>{`
        body { background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%); }
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
        /* Hover de plataformas */
        .platform-sphere:hover { transform: scale(1.2) rotate(5deg); box-shadow: 0 0 40px rgba(255,255,255,0.9); animation: none; }
      `}</style>
    </section>
  );
};

export default QanticaCenter;
