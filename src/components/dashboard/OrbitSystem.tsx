import React, { useEffect, useRef } from "react";

/**
 * Componente: OrbitSystem
 * - Mantiene tu layout, estilos y física.
 * - Solo YouTube usa <img src="/logos/Logo_of_youtube.svg" />.
 */
const OrbitSystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ---------- Toda tu lógica JS, adaptada a refs ----------
    const root = containerRef.current!;
    const modal = modalRef.current!;

    // --- CONSTANTES DEL SISTEMA ---
    const CONTAINER_SIZE = 600;
    const CENTER_X = CONTAINER_SIZE / 2;
    const CENTER_Y = CONTAINER_SIZE / 2;
    const ITEM_RADIUS = 35;

    const orbitPath = root.querySelector(".orbit-path") as HTMLDivElement;
    const MAX_RADIUS = orbitPath.offsetWidth / 2;
    const CENTER_BUFFER = 80;

    const youtubeItemElement = root.querySelector('[data-item-id="youtube"]') as HTMLDivElement;
    const staticItemElements = Array.from(root.querySelectorAll(".orbital-item")).filter(
      (el) => el !== youtubeItemElement
    ) as HTMLDivElement[];

    // Objetos de estado para la física
    type ItemObj = {
      element: HTMLDivElement;
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      initialX: number;
      initialY: number;
    };

    const staticItems: ItemObj[] = staticItemElements.map((el) => ({
      element: el,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      radius: ITEM_RADIUS,
      initialX: 0,
      initialY: 0,
    }));

    const NUM_STATIC_ITEMS = staticItems.length;

    const RADIUS_OUTER = MAX_RADIUS - ITEM_RADIUS - 10;
    const RADIUS_INNER = CENTER_BUFFER + ITEM_RADIUS + 30;

    let youtubeState: ItemObj = {
      element: youtubeItemElement,
      x: 0,
      y: 0,
      dx: 1.0,
      dy: 1.2,
      radius: ITEM_RADIUS,
      initialX: 0,
      initialY: 0,
    };

    const itemData: Record<
      string,
      { title: string; description: string }
    > = {
      netflix: {
        title: "Netflix",
        description:
          "Líder mundial en streaming, un pilar fundamental en la distribución de contenido de Qantica. (Streamer)",
      },
      amazon: {
        title: "Amazon Prime Video",
        description:
          "Plataforma potente con gran base de usuarios. (Streamer)",
      },
      paramount: {
        title: "Paramount+",
        description:
          "Consolida contenido de CBS, Paramount Pictures y más. (Streamer)",
      },
      hbomax: {
        title: "HBO Max",
        description:
          "Contenido premium y de alta calidad. (Streamer)",
      },
      disney: {
        title: "Disney+",
        description:
          "IP familiares y franquicias de gran escala. (Streamer)",
      },
      appletv: {
        title: "Apple TV+",
        description:
          "Contenido original de prestigio. (Streamer)",
      },
      mubi: {
        title: "MUBI",
        description:
          "Curador de cine independiente y de culto. (Streamer)",
      },
      a24: {
        title: "A24",
        description:
          "Productora/distribuidora asociada a innovación creativa. (IP Asociado)",
      },
      youtube: {
        title: "YouTube",
        description:
          "Canal de distribución de vídeo más grande del mundo. (IP Asociado)",
      },
      imdb: {
        title: "IMDb",
        description:
          "Base de datos clave para la industria. (IP Asociado)",
      },
      animoca: {
        title: "Animoca Brands",
        description:
          "Convergencia de entretenimiento, juegos y blockchain. (IP Asociado)",
      },
      story: {
        title: "Story",
        description:
          "Representa estudios/agentes de desarrollo narrativo. (IP Asociado)",
      },
      angelstudios: {
        title: "Angel Studios",
        description:
          "Estudio con fuerte componente de crowdfunding. (IP Asociado)",
      },
      patreon: {
        title: "Patreon",
        description:
          "Soporte directo de la comunidad a creadores. (IP Asociado)",
      },
      rockstargames: {
        title: "Rockstar Games",
        description:
          "Desarrollador AAA de mundos abiertos. (IP Asociado)",
      },
      roblox: {
        title: "Roblox",
        description:
          "Plataforma masiva de creación de mundos virtuales. (IP Asociado)",
      },
    };

    // Utilidades
    const distance = (x1: number, y1: number, x2: number, y2: number) =>
      Math.hypot(x2 - x1, y2 - y1);

    function isColliding(targetX: number, targetY: number, selfItem: ItemObj | null = null) {
      const distToCenterQ = distance(targetX, targetY, CENTER_X, CENTER_Y);
      if (distToCenterQ < ITEM_RADIUS + CENTER_BUFFER) return true;

      for (const item of staticItems) {
        if (item === selfItem) continue;
        const d = distance(targetX, targetY, item.x, item.y);
        if (d < ITEM_RADIUS * 2) return true;
      }
      return false;
    }

    function placeStaticItemOrganized(itemObj: ItemObj, index: number) {
      let x = 0,
        y = 0,
        attempts = 0;
      const MAX_ATTEMPTS = 500;

      const angleStep = (2 * Math.PI) / NUM_STATIC_ITEMS;
      const baseAngle = index * angleStep;
      const targetRadius = index % 2 === 0 ? RADIUS_OUTER : RADIUS_INNER;

      do {
        const angle = baseAngle + (Math.random() - 0.5) * 0.1;
        const radius = targetRadius + (Math.random() - 0.5) * 20;

        x = CENTER_X + radius * Math.cos(angle);
        y = CENTER_Y + radius * Math.sin(angle);

        attempts++;
        if (attempts > MAX_ATTEMPTS) {
          const fallbackRadius =
            Math.random() * (MAX_RADIUS - CENTER_BUFFER) + CENTER_BUFFER;
          x =
            CENTER_X +
            fallbackRadius * Math.cos(Math.random() * 2 * Math.PI);
          y =
            CENTER_Y +
            fallbackRadius * Math.sin(Math.random() * 2 * Math.PI);
          break;
        }
      } while (isColliding(x, y, itemObj));

      itemObj.x = x;
      itemObj.y = y;
      itemObj.initialX = x;
      itemObj.initialY = y;
      itemObj.element.style.left = `${x - ITEM_RADIUS}px`;
      itemObj.element.style.top = `${y - ITEM_RADIUS}px`;
    }

    // Física
    const DAMPING_FACTOR = 0.8;
    const FRICTION_STATIC = 0.95;
    const FRICTION_MOVING = 0.9999;
    const REPEL_FORCE_MAGNITUDE = 0.01;
    const SPRING_K = 0.01;
    const REPEL_RADIUS_Q = 200;
    const REPEL_RADIUS_ITEM = 100;

    function applyRepulsionForces(item: ItemObj) {
      // Centro Q
      const distToQ = distance(item.x, item.y, CENTER_X, CENTER_Y);
      if (distToQ < REPEL_RADIUS_Q) {
        const angle = Math.atan2(item.y - CENTER_Y, item.x - CENTER_X);
        const force = REPEL_FORCE_MAGNITUDE * (1 - distToQ / REPEL_RADIUS_Q);
        item.dx += force * Math.cos(angle);
        item.dy += force * Math.sin(angle);
      }
      // Otros estáticos
      for (const other of staticItems) {
        if (other === item) continue;
        const dist = distance(item.x, item.y, other.x, other.y);
        if (dist < REPEL_RADIUS_ITEM) {
          const angle = Math.atan2(item.y - other.y, item.x - other.x);
          const force = REPEL_FORCE_MAGNITUDE * (1 - dist / REPEL_RADIUS_ITEM);
          item.dx += force * Math.cos(angle);
          item.dy += force * Math.sin(angle);
        }
      }
    }

    function resolveCollision(item1: ItemObj, item2: ItemObj) {
      const dist = distance(item1.x, item1.y, item2.x, item2.y);
      const minDistance = ITEM_RADIUS * 2;
      if (dist >= minDistance) return;

      const nx = (item1.x - item2.x) / dist;
      const ny = (item1.y - item2.y) / dist;

      const vx = item1.dx - item2.dx;
      const vy = item1.dy - item2.dy;
      const dot = vx * nx + vy * ny;
      if (dot > 0) return;

      const impulse = (-(1 + DAMPING_FACTOR) * dot) / 2;
      item1.dx += impulse * nx;
      item1.dy += impulse * ny;
      item2.dx -= impulse * nx;
      item2.dy -= impulse * ny;

      const overlap = minDistance - dist;
      const cx = nx * overlap * 0.5;
      const cy = ny * overlap * 0.5;
      item1.x += cx;
      item1.y += cy;
      item2.x -= cx;
      item2.y -= cy;
    }

    // Modal helpers
    const showModal = (id: string | null) => {
      if (!id) return;
      const data = itemData[id];
      if (!data) return;
      (modal.querySelector("#modal-title") as HTMLElement).textContent = data.title;
      (modal.querySelector("#modal-description") as HTMLElement).textContent = data.description;
      (modal as HTMLDivElement).style.display = "flex";
    };
    const hideModal = () => ((modal as HTMLDivElement).style.display = "none");
    (modal as HTMLDivElement).addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "info-modal") hideModal();
    });

    // Inicialización
    staticItems.forEach((itemObj, index) => {
      placeStaticItemOrganized(itemObj, index);
      const id = itemObj.element.getAttribute("data-item-id");
      itemObj.element.addEventListener("click", () => showModal(id));
    });
    youtubeItemElement.addEventListener("click", () => showModal("youtube"));

    // Posición inicial de YouTube
    (function placeYouTube() {
      let x = 0,
        y = 0,
        attempts = 0;
      const MAX_ATTEMPTS_YT = 500;
      const START_RADIUS_MIN_YT = CENTER_BUFFER + ITEM_RADIUS + 20;
      const START_RADIUS_MAX_YT = MAX_RADIUS - ITEM_RADIUS - 20;
      do {
        const angle = Math.random() * 2 * Math.PI;
        const radius =
          START_RADIUS_MIN_YT +
          Math.random() * (START_RADIUS_MAX_YT - START_RADIUS_MIN_YT);
        x = CENTER_X + radius * Math.cos(angle);
        y = CENTER_Y + radius * Math.sin(angle);
        attempts++;
        if (attempts > MAX_ATTEMPTS_YT) break;
      } while (isColliding(x, y, youtubeState));
      youtubeState.x = x;
      youtubeState.y = y;
      youtubeItemElement.style.left = `${x - ITEM_RADIUS}px`;
      youtubeItemElement.style.top = `${y - ITEM_RADIUS}px`;
    })();

    // Animación global
    let raf = 0;
    const animate = () => {
      // YouTube vs Q (interior)
      {
        let { x, y, dx, dy, radius, element } = youtubeState;
        const distToQ = distance(x + dx, y + dy, CENTER_X, CENTER_Y);
        if (distToQ < radius + CENTER_BUFFER) {
          const nx = (x - CENTER_X) / distToQ;
          const ny = (y - CENTER_Y) / distToQ;
          const dot = dx * nx + dy * ny;
          if (dot < 0) {
            dx = (dx - 2 * dot * nx) * DAMPING_FACTOR;
            dy = (dy - 2 * dot * ny) * DAMPING_FACTOR;
          }
          const overlap = radius + CENTER_BUFFER - distToQ;
          x += nx * overlap * 0.5;
          y += ny * overlap * 0.5;
        }
        // YouTube vs anillo exterior
        {
          const dist = distance(x + dx, y + dy, CENTER_X, CENTER_Y);
          const maxAllowed = MAX_RADIUS - radius;
          if (dist > maxAllowed) {
            const nx = (x - CENTER_X) / dist;
            const ny = (y - CENTER_Y) / dist;
            const dot = dx * nx + dy * ny;
            dx = (dx - 2 * dot * nx) * DAMPING_FACTOR;
            dy = (dy - 2 * dot * ny) * DAMPING_FACTOR;
            x = CENTER_X + nx * maxAllowed;
            y = CENTER_Y + ny * maxAllowed;
          }
        }
        // Colisiones con estáticos
        for (const si of staticItems) resolveCollision(youtubeState, si);
        // Fricción (mínima)
        dx *= FRICTION_MOVING;
        dy *= FRICTION_MOVING;
        // Actualizar
        x += dx;
        y += dy;
        youtubeState.x = x;
        youtubeState.y = y;
        youtubeState.dx = dx;
        youtubeState.dy = dy;
        (element as HTMLDivElement).style.left = `${x - ITEM_RADIUS}px`;
        (element as HTMLDivElement).style.top = `${y - ITEM_RADIUS}px`;
      }

      // Estáticos semi-dinámicos
      for (let i = 0; i < NUM_STATIC_ITEMS; i++) {
        const item = staticItems[i];
        // muelle hacia su ancla
        item.dx += (item.initialX - item.x) * SPRING_K;
        item.dy += (item.initialY - item.y) * SPRING_K;

        applyRepulsionForces(item);

        // con Q
        const distQ = distance(item.x + item.dx, item.y + item.dy, CENTER_X, CENTER_Y);
        if (distQ < item.radius + CENTER_BUFFER) {
          const nx = (item.x - CENTER_X) / distQ;
          const ny = (item.y - CENTER_Y) / distQ;
          const dot = item.dx * nx + item.dy * ny;
          if (dot < 0) {
            item.dx = (item.dx - 2 * dot * nx) * DAMPING_FACTOR;
            item.dy = (item.dy - 2 * dot * ny) * DAMPING_FACTOR;
          }
          const overlap = item.radius + CENTER_BUFFER - distQ;
          item.x += nx * overlap * 0.5;
          item.y += ny * overlap * 0.5;
        }
        // con anillo
        const distC = distance(item.x + item.dx, item.y + item.dy, CENTER_X, CENTER_Y);
        const maxAllowed = MAX_RADIUS - item.radius;
        if (distC > maxAllowed) {
          const nx = (item.x - CENTER_X) / distC;
          const ny = (item.y - CENTER_Y) / distC;
          const dot = item.dx * nx + item.dy * ny;
          item.dx = (item.dx - 2 * dot * nx) * DAMPING_FACTOR;
          item.dy = (item.dy - 2 * dot * ny) * DAMPING_FACTOR;
          item.x = CENTER_X + nx * maxAllowed;
          item.y = CENTER_Y + ny * maxAllowed;
        }
        // entre estáticos (solo pares i<j)
        for (let j = i + 1; j < NUM_STATIC_ITEMS; j++) resolveCollision(item, staticItems[j]);
        // fricción y avanzar
        item.dx *= FRICTION_STATIC;
        item.dy *= FRICTION_STATIC;
        item.x += item.dx;
        item.y += item.dy;
        item.element.style.left = `${item.x - ITEM_RADIUS}px`;
        item.element.style.top = `${item.y - ITEM_RADIUS}px`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* Marco superior derecho */}
      <div className="text-frame frame-top">
        <div className="line-label">
          <span className="highlight-yellow">Qantica’s</span> vision is to fluidly integrate the worlds of Film, TV and Video Games into valuable, long-lasting IPs.
        </div>
      </div>

      {/* Marco inferior izquierdo */}
      <div className="text-frame frame-bottom">
        <div className="line-label">
          We are not competitors. We will provide raw material to all platforms by offering them a high <span className="highlight-yellow">quality content.</span>
        </div>
      </div>

      {/* Contenedor principal del diagrama */}
      <div className="container" ref={containerRef}>
        <div className="background-line" />
        <div className="center-circle" id="center-q" />
        <div className="orbit-path" />

        {/* Sistema de contenido */}
        <div id="content-system">
          {/* TEXTOS (se quedan como texto) */}
          <div className="orbital-item static-item" data-item-id="netflix">NETFLIX</div>
          <div className="orbital-item static-item" data-item-id="amazon">AMAZON</div>
          <div className="orbital-item static-item" data-item-id="paramount">PARAMOUNT</div>
          <div className="orbital-item static-item color-4" data-item-id="a24">A24</div>
          <div className="orbital-item static-item" data-item-id="hbomax">HBO MAX</div>
          <div className="orbital-item static-item" data-item-id="disney">DISNEY+</div>

          {/* YOUTUBE como LOGO (único cambio) */}
          <div className="orbital-item color-7 moving-item" data-item-id="youtube" title="YouTube">
            <img
              src="/logos/Logo_of_youtube.svg"
              alt="YouTube"
              className="logo-img"
            />
          </div>

          <div className="orbital-item static-item" data-item-id="appletv">APPLE TV+</div>
          <div className="orbital-item static-item color-9" data-item-id="imdb">IMDB</div>
          <div className="orbital-item static-item color-10" data-item-id="animoca">ANIMOCA BRANDS</div>
          <div className="orbital-item static-item color-11" data-item-id="story">STORY</div>
          <div className="orbital-item static-item color-12" data-item-id="angelstudios">ANGEL STUDIOS</div>
          <div className="orbital-item static-item color-13" data-item-id="patreon">PATREON</div>
          <div className="orbital-item static-item" data-item-id="mubi">MUBI</div>
          <div className="orbital-item static-item color-15" data-item-id="rockstargames">ROCKSTAR GAMES</div>
          <div className="orbital-item static-item color-16" data-item-id="roblox">ROBLOX</div>
        </div>
      </div>

      {/* Modal */}
      <div id="info-modal" className="modal-overlay" ref={modalRef}>
        <div className="modal-content" id="modal-content">
          <button className="modal-close" onClick={() => ((modalRef.current as HTMLDivElement).style.display = "none")}>
            &times;
          </button>
          <h3 id="modal-title">Título del Item</h3>
          <p id="modal-description">Descripción detallada del ítem.</p>
        </div>
      </div>

      {/* Estilos (tu CSS tal cual, con una regla extra para <img> dentro de las esferas) */}
      <style>{`
        :root { --center-radius:65px; --item-size:70px; --container-size:600px; --center-offset:300px; --orbit-path-size:530px; }
        body { background-color:black; background-image: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), linear-gradient(135deg,#101010 0%,#000 100%); overflow:hidden; height:10vh; margin:0; font-family:Inter,sans-serif; text-align:center; display:flex; flex-direction:column; align-items:center;}
        .container{position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:var(--container-size); height:var(--container-size); display:flex; justify-content:center; align-items:center; z-index:100;}
        .text-frame{position:absolute; z-index:200; width:350px; padding:20px; background:#000; border-radius:12px; border:1px solid rgba(255,215,0,.4); box-shadow:0 4px 30px rgba(0,0,0,.9);}
        .line-label{color:#D1D5DB; font-size:14px; font-weight:500; line-height:1.3; text-shadow:0 0 5px rgba(209,213,219,.3);}
        .highlight-yellow{color:#FFD700; text-shadow:0 0 8px rgba(255,215,0,.7);}
        .frame-top{top:5vh; right:5vw; text-align:right;}
        .frame-bottom{bottom:5vh; left:5vw; text-align:left;}
        .background-line{position:absolute; width:800px; height:2px; background:#FFD700; z-index:1; top:50%; left:50%; transform:translate(-50%,-55%) rotate(-45deg);}
        .center-circle{width:130px; height:130px; border:6px solid #FFD700; border-radius:50%; display:flex; justify-content:center; align-items:center; position:absolute; z-index:10; box-shadow:0 0 30px rgba(255,215,0,.6); background-color:rgba(0,0,0,.4); cursor:default; transition:all .2s ease-out;}
        .center-circle:hover{transform:scale(1.05); box-shadow:0 0 50px rgba(255,215,0,.8);}
        .center-circle::before{content:'Q'; color:#FFD700; font-size:90px; font-weight:900; text-shadow:0 0 15px rgba(255,215,0,1);}
        .orbit-path{position:absolute; width:var(--orbit-path-size); height:var(--orbit-path-size); border:2px solid #FFD700; border-radius:50%; z-index:2;}
        .orbital-item{position:absolute; width:var(--item-size); height:var(--item-size); border-radius:50%; display:flex; justify-content:center; align-items:center; font-size:12px; font-weight:bold; color:black; text-align:center; padding:5px; box-sizing:border-box; cursor:pointer; top:50%; left:50%; transform:translate(-50%,-50%); transition:all .3s ease-out; z-index:15;}
        .static-item{background:#D1D5DB; box-shadow:0 0 15px rgba(255,215,0,.8),0 0 35px rgba(255,215,0,.5); animation:pulseGlow 3s infinite alternate; will-change:transform,top,left;}
        .moving-item{background:#FF0000 !important; box-shadow:0 0 20px rgba(255,0,0,1),0 0 40px rgba(255,0,0,.7); transition:none; will-change:transform,top,left;}
        .orbital-item:hover{transform:scale(1.1); box-shadow:0 0 50px #FFD700,0 0 80px rgba(255,215,0,.8); z-index:100;}
        .moving-item:hover{transform:scale(1.1); box-shadow:0 0 50px #FF0000,0 0 80px rgba(255,0,0,.8);}
        @keyframes pulseGlow {from{box-shadow:0 0 10px #FFD700,0 0 20px rgba(255,215,0,.7); opacity:.9;} to{box-shadow:0 0 15px #FFD700,0 0 30px #FFD700; opacity:1;}}
        .color-4{background:#6D28D9;} .color-7{background:#FF0000;} .color-9{background:#F3CE00;} .color-10{background:#8DFF38;} .color-11{background:#FF4500;} .color-12{background:#1E90FF;} .color-13{background:#FFB6C1;} .color-15{background:#F0553A;} .color-16{background:#A329FC;}
        .modal-overlay{display:none; position:fixed; inset:0; background:rgba(0,0,0,.8); z-index:1000; justify-content:center; align-items:center;}
        .modal-content{background:#1a1a1a; color:#D1D5DB; padding:30px; border-radius:15px; width:90%; max-width:450px; box-shadow:0 0 50px rgba(255,215,0,.7); border:2px solid #FFD700; animation:fadeIn .3s ease-out;}
        @keyframes fadeIn{from{opacity:0; transform:scale(.95);} to{opacity:1; transform:scale(1);}}
        .modal-content h3{color:#FFD700; margin-top:0; border-bottom:2px solid #333; padding-bottom:10px;}
        .modal-close{float:right; font-size:24px; font-weight:bold; line-height:1; color:#FFD700; cursor:pointer; border:none; background:none; margin-left:10px;}
        /* Imagen dentro de la esfera (YouTube) */
        .logo-img{width:70%; height:70%; object-fit:contain; display:block; pointer-events:none;}
      `}</style>
    </>
  );
};

export default OrbitSystem;
