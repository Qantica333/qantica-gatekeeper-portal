import React, { useEffect, useRef, useState } from "react";

/**
 * OrbitSystem responsive con física original + optimizaciones:
 * - Reduce elementos en móvil (YouTube + 5) para mejor rendimiento.
 * - Pausa animación cuando sale del viewport (IntersectionObserver) o pestaña oculta.
 * - Recalcula límites y radios en resize (ResizeObserver).
 * - Fondo gris Amazon para todos salvo YouTube (rojo).
 */

const MOBILE_STATIC_IDS = ["amazon", "netflix", "disney", "hbomax", "animoca", "rockstargames","story", "imdb"]; // edita a gusto

const OrbitSystemV4: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Ancho del contenedor para decidir si es "móvil"
  const [containerWidth, setContainerWidth] = useState(0);
  const isMobile = containerWidth > 0 && containerWidth < 480;

  // Observa el tamaño del contenedor para responsive
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setContainerWidth(w);
    });
    ro.observe(el);
    // set inicial
    setContainerWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = containerRef.current!;
    const modal = modalRef.current!;

    // --- Selección de elementos DOM según render actual ---
    const youtubeItemElement = root.querySelector(
      '[data-item-id="youtube"]'
    ) as HTMLDivElement;

    const staticItemElements = Array.from(
      root.querySelectorAll<HTMLDivElement>(".orbital-item.static-item")
    );

    // ---------- Estado y helpers responsivos ----------
    let CONTAINER_SIZE = Math.min(root.clientWidth, root.clientHeight || root.clientWidth);

    const sizeToItemRadius = (s: number) => Math.max(22, Math.min(35, s * 0.06)); // 6% del tamaño (clamp 22..35)
    let ITEM_RADIUS = sizeToItemRadius(CONTAINER_SIZE);

    const CENTER_X = () => CONTAINER_SIZE / 2;
    const CENTER_Y = () => CONTAINER_SIZE / 2;

    const orbitPath = root.querySelector(".orbit-path") as HTMLDivElement;
    const computeMaxRadius = () =>
      Math.min(orbitPath.offsetWidth, orbitPath.offsetHeight) / 2;
    let MAX_RADIUS = computeMaxRadius();

    const CENTER_BUFFER = () =>
      Math.max(80 * (CONTAINER_SIZE / 600), ITEM_RADIUS * 2 + 10);

    type ItemObj = {
      element: HTMLDivElement;
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      initialX: number;
      initialY: number;
      angle: number; // ancla angular
      ring: "inner" | "outer";
      jitter: number;
    };

    const NUM_STATIC_ITEMS = staticItemElements.length;
    const angleStep = (2 * Math.PI) / (NUM_STATIC_ITEMS || 1);

    const ringRadii = () => {
      const outer = MAX_RADIUS - ITEM_RADIUS - 10;
      const inner = CENTER_BUFFER() + ITEM_RADIUS + 30;
      return { outer, inner };
    };

    const staticItems: ItemObj[] = staticItemElements.map((el, i) => {
      const ring: "inner" | "outer" = i % 2 === 0 ? "outer" : "inner";
      return {
        element: el,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        radius: ITEM_RADIUS,
        initialX: 0,
        initialY: 0,
        angle: i * angleStep,
        ring,
        jitter: (Math.random() - 0.5) * 16, // +-8px
      };
    });

    let youtubeState: ItemObj = {
      element: youtubeItemElement,
      x: 0,
      y: 0,
      dx: 1.0,
      dy: 1.2,
      radius: ITEM_RADIUS,
      initialX: 0,
      initialY: 0,
      angle: 0,
      ring: "outer",
      jitter: 0,
    };

    // FÍSICA
    const distance = (x1: number, y1: number, x2: number, y2: number) =>
      Math.hypot(x2 - x1, y2 - y1);

    const DAMPING_FACTOR = 0.8;
    const FRICTION_STATIC = 0.95;
    const FRICTION_MOVING = 0.9992; // más suave en pantallas pequeñas
    const REPEL_FORCE_MAGNITUDE = 0.01;
    const SPRING_K = 0.01;
    const REPEL_RADIUS_Q = () => Math.max(200 * (CONTAINER_SIZE / 600), 120);
    const REPEL_RADIUS_ITEM = () => Math.max(100 * (CONTAINER_SIZE / 600), 70);

    function applyRepulsionForces(item: ItemObj) {
      // Repulsión del centro Q
      const distToQ = distance(item.x, item.y, CENTER_X(), CENTER_Y());
      if (distToQ < REPEL_RADIUS_Q()) {
        const angle = Math.atan2(item.y - CENTER_Y(), item.x - CENTER_X());
        const force = REPEL_FORCE_MAGNITUDE * (1 - distToQ / REPEL_RADIUS_Q());
        item.dx += force * Math.cos(angle);
        item.dy += force * Math.sin(angle);
      }
      // Repulsión con otros estáticos
      for (const other of staticItems) {
        if (other === item) continue;
        const dist = distance(item.x, item.y, other.x, other.y);
        if (dist < REPEL_RADIUS_ITEM()) {
          const angle = Math.atan2(item.y - other.y, item.x - other.x);
          const force =
            REPEL_FORCE_MAGNITUDE * (1 - dist / REPEL_RADIUS_ITEM());
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

const itemData: Record<string, { title: string; description: string }> = {
  netflix: {
    title: "Netflix",
    description: "Global leader in subscription streaming and a cornerstone outlet for wide-reach distribution. (Streamer)",
  },
  amazon: {
    title: "Amazon Prime Video",
    description: "Large on-demand platform tied to the Amazon ecosystem, mixing hit originals with licensed catalogs. (Streamer)",
  },
  paramount: {
    title: "Paramount+",
    description: "Service unifying CBS and Paramount libraries with franchise-driven originals. (Streamer)",
  },
  hbomax: {
    title: "HBO Max",
    description: "Home of premium, high-quality originals and films with a strong prestige footprint. (Streamer)",
  },
  disney: {
    title: "Disney+",
    description: "Dominant engine for family and franchise IP (Marvel, Star Wars, Pixar) at global scale. (Streamer)",
  },
  appletv: {
    title: "Apple TV+",
    description: "Growing slate of award-winning, creator-led originals with premium positioning. (Streamer)",
  },
  mubi: {
    title: "MUBI",
    description: "Curated arthouse and independent cinema for niche and auteur audiences. (Streamer)",
  },
  a24: {
    title: "A24",
    description: "Independent studio and distributor known for bold, innovative filmmaking and cult IP. (Associated IP)",
  },
  youtube: {
    title: "YouTube",
    description: "World’s largest video distribution channel—ideal for shorts, discovery, and UGC monetization. (Associated IP)",
  },
  imdb: {
    title: "IMDb",
    description: "Industry reference database for credits, ratings, and visibility across film and TV. (Associated IP)",
  },
  animoca: {
    title: "Animoca Brands",
    description: "Leader at the intersection of entertainment, gaming, and blockchain; gateway to Web3 and metaverse. (Associated IP)",
  },
  story: {
    title: "Story",
    description: "Represents development partners and narrative packaging across formats. (Associated IP)",
  },
  angelstudios: {
    title: "Angel Studios",
    description: "Studio powered by community crowdfunding and audience-driven greenlighting. (Associated IP)",
  },
  patreon: {
    title: "Patreon",
    description: "Direct-to-creator membership funding and community monetization platform. (Associated IP)",
  },
  rockstargames: {
    title: "Rockstar Games",
    description: "AAA studio behind expansive open-world franchises and cinematic storytelling. (Associated IP)",
  },
  roblox: {
    title: "Roblox",
    description: "Massive user-generated virtual worlds platform; key youth metaverse presence. (Associated IP)",
  },
};

    const showModal = (id: string | null) => {
      if (!id) return;
      const data = itemData[id];
      if (!data) return;
      (modal.querySelector("#modal-title") as HTMLElement).textContent =
        data.title;
      (modal.querySelector("#modal-description") as HTMLElement).textContent =
        data.description;
      (modal as HTMLDivElement).style.display = "flex";
    };
    modal.onclick = (e) => {
      const t = e.target as HTMLElement;
      if (t.id === "info-modal") (modal as HTMLDivElement).style.display = "none";
    };

    // ------- POSICIONAMIENTO INICIAL (RESPONSIVO) -------
    const { outer, inner } = ringRadii();
    for (const it of staticItems) {
      const targetR = it.ring === "outer" ? outer : inner;
      const r = targetR + it.jitter;
      it.x = CENTER_X() + r * Math.cos(it.angle);
      it.y = CENTER_Y() + r * Math.sin(it.angle);
      it.initialX = it.x;
      it.initialY = it.y;
      it.element.style.left = `${it.x - ITEM_RADIUS}px`;
      it.element.style.top = `${it.y - ITEM_RADIUS}px`;

      const id = it.element.getAttribute("data-item-id");
      it.element.onclick = () => showModal(id);
    }

    youtubeItemElement.onclick = () => showModal("youtube");

    // Posición inicial de YouTube
    (function placeYouTube() {
      let x = 0,
        y = 0,
        attempts = 0;
      const MAX_ATTEMPTS_YT = 500;
      const START_RADIUS_MIN_YT = CENTER_BUFFER() + ITEM_RADIUS + 20;
      const START_RADIUS_MAX_YT = MAX_RADIUS - ITEM_RADIUS - 20;
      do {
        const angle = Math.random() * 2 * Math.PI;
        const radius =
          START_RADIUS_MIN_YT +
          Math.random() * (START_RADIUS_MAX_YT - START_RADIUS_MIN_YT);
        x = CENTER_X() + radius * Math.cos(angle);
        y = CENTER_Y() + radius * Math.sin(angle);
        attempts++;
        if (attempts > MAX_ATTEMPTS_YT) break;
      } while (
        staticItems.some((s) => distance(x, y, s.x, s.y) < ITEM_RADIUS * 2) ||
        distance(x, y, CENTER_X(), CENTER_Y()) < ITEM_RADIUS + CENTER_BUFFER()
      );
      youtubeState.x = x;
      youtubeState.y = y;
      youtubeItemElement.style.left = `${x - ITEM_RADIUS}px`;
      youtubeItemElement.style.top = `${y - ITEM_RADIUS}px`;
    })();

    // ------- ANIMACIÓN -------
    let raf: number | null = null;

    const animate = () => {
      // YouTube contra Q
      {
        let { x, y, dx, dy, radius, element } = youtubeState;

        const distToQ = distance(x + dx, y + dy, CENTER_X(), CENTER_Y());
        if (distToQ < radius + CENTER_BUFFER()) {
          const nx = (x - CENTER_X()) / distToQ;
          const ny = (y - CENTER_Y()) / distToQ;
          const dot = dx * nx + dy * ny;
          if (dot < 0) {
            dx = (dx - 2 * dot * nx) * DAMPING_FACTOR;
            dy = (dy - 2 * dot * ny) * DAMPING_FACTOR;
          }
          const overlap = radius + CENTER_BUFFER() - distToQ;
          x += nx * overlap * 0.5;
          y += ny * overlap * 0.5;
        }

        // Límite exterior
        {
          const dist = distance(x + dx, y + dy, CENTER_X(), CENTER_Y());
          const maxAllowed = MAX_RADIUS - radius;
          if (dist > maxAllowed) {
            const nx = (x - CENTER_X()) / dist;
            const ny = (y - CENTER_Y()) / dist;
            const dot = dx * nx + dy * ny;
            dx = (dx - 2 * dot * nx) * DAMPING_FACTOR;
            dy = (dy - 2 * dot * ny) * DAMPING_FACTOR;
            x = CENTER_X() + nx * maxAllowed;
            y = CENTER_Y() + ny * maxAllowed;
          }
        }

        // Colisiones con estáticos
        for (const si of staticItems) resolveCollision(youtubeState, si);

        // Fricción
        dx *= FRICTION_MOVING;
        dy *= FRICTION_MOVING;

        x += dx;
        y += dy;
        youtubeState.x = x;
        youtubeState.y = y;
        youtubeState.dx = dx;
        youtubeState.dy = dy;
        (element as HTMLDivElement).style.left = `${x - ITEM_RADIUS}px`;
        (element as HTMLDivElement).style.top = `${y - ITEM_RADIUS}px`;
      }

      // Estáticos con muelle + repulsión + límites
      for (let i = 0; i < staticItems.length; i++) {
        const item = staticItems[i];

        item.dx += (item.initialX - item.x) * SPRING_K;
        item.dy += (item.initialY - item.y) * SPRING_K;

        applyRepulsionForces(item);

        // Colisión con Q
        const distQ = distance(item.x + item.dx, item.y + item.dy, CENTER_X(), CENTER_Y());
        if (distQ < item.radius + CENTER_BUFFER()) {
          const nx = (item.x - CENTER_X()) / distQ;
          const ny = (item.y - CENTER_Y()) / distQ;
          const dot = item.dx * nx + item.dy * ny;
          if (dot < 0) {
            item.dx = (item.dx - 2 * dot * nx) * DAMPING_FACTOR;
            item.dy = (item.dy - 2 * dot * ny) * DAMPING_FACTOR;
          }
          const overlap = item.radius + CENTER_BUFFER() - distQ;
          item.x += nx * overlap * 0.5;
          item.y += ny * overlap * 0.5;
        }

        // Límite exterior
        const distC = distance(item.x + item.dx, item.y + item.dy, CENTER_X(), CENTER_Y());
        const maxAllowed = MAX_RADIUS - item.radius;
        if (distC > maxAllowed) {
          const nx = (item.x - CENTER_X()) / distC;
          const ny = (item.y - CENTER_Y()) / distC;
          const dot = item.dx * nx + item.dy * ny;
          item.dx = (item.dx - 2 * dot * nx) * DAMPING_FACTOR;
          item.dy = (item.dy - 2 * dot * ny) * DAMPING_FACTOR;
          item.x = CENTER_X() + nx * maxAllowed;
          item.y = CENTER_Y() + ny * maxAllowed;
        }

        // Colisiones entre estáticos
        for (let j = i + 1; j < staticItems.length; j++)
          resolveCollision(item, staticItems[j]);

        // Fricción y avanzar
        item.dx *= FRICTION_STATIC;
        item.dy *= FRICTION_STATIC;
        item.x += item.dx;
        item.y += item.dy;
        item.element.style.left = `${item.x - ITEM_RADIUS}px`;
        item.element.style.top = `${item.y - ITEM_RADIUS}px`;
      }

      raf = requestAnimationFrame(animate);
    };

    // Pausar por pestaña oculta y por salir del viewport
    const onVis = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!document.hidden && !raf) {
        raf = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    let inView = true;
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (!inView && raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
        if (inView && !raf && !document.hidden) {
          raf = requestAnimationFrame(animate);
        }
      },
      { root: null, threshold: 0.1 }
    );
    io.observe(root);

    // Lanzamos animación
    if (!raf) raf = requestAnimationFrame(animate);

    // Responsive: cuando cambie el tamaño, recalculamos límites y recolocamos
    const ro = new ResizeObserver(() => {
      CONTAINER_SIZE = Math.min(root.clientWidth, root.clientHeight || root.clientWidth);
      ITEM_RADIUS = sizeToItemRadius(CONTAINER_SIZE);
      staticItems.forEach((s) => (s.radius = ITEM_RADIUS));
      youtubeState.radius = ITEM_RADIUS;

      MAX_RADIUS = computeMaxRadius();

      const { outer, inner } = ringRadii();
      for (const it of staticItems) {
        const targetR = it.ring === "outer" ? outer : inner;
        const r = targetR + it.jitter;
        it.initialX = CENTER_X() + r * Math.cos(it.angle);
        it.initialY = CENTER_Y() + r * Math.sin(it.angle);
        // No teletransportamos; el muelle los lleva
      }

      // Si YT quedó fuera, lo proyectamos al borde
      const distYT = distance(youtubeState.x, youtubeState.y, CENTER_X(), CENTER_Y());
      const maxAllowed = MAX_RADIUS - youtubeState.radius;
      if (distYT > maxAllowed) {
        const ang = Math.atan2(youtubeState.y - CENTER_Y(), youtubeState.x - CENTER_X());
        youtubeState.x = CENTER_X() + maxAllowed * Math.cos(ang);
        youtubeState.y = CENTER_Y() + maxAllowed * Math.sin(ang);
        youtubeItemElement.style.left = `${youtubeState.x - ITEM_RADIUS}px`;
        youtubeItemElement.style.top = `${youtubeState.y - ITEM_RADIUS}px`;
      }

      if (!raf && inView && !document.hidden) {
        raf = requestAnimationFrame(animate);
      }
    });
    ro.observe(root);

    // Cleanup al reinit (cambia cuando isMobile cambia o al desmontar)
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
      // quitar handlers de click de forma segura
      staticItems.forEach((it) => (it.element.onclick = null));
      youtubeItemElement.onclick = null;
      modal.onclick = null;
    };
  }, [isMobile]); // Re-inicializa física cuando cambia layout (móvil/desktop)

  // Helper para render condicional de ítems en móvil
  const show = (id: string) =>
    id === "youtube" || !isMobile || MOBILE_STATIC_IDS.includes(id);

  return (
    <div
      className="orbit-wrapper"
      style={{ position: "relative", width: "100%", height: "100%", minHeight: "700px" }}
    >
      {/* Marco superior derecho */}
      <div className="text-frame frame-top">
        <div className="line-label">
          <span className="highlight-yellow">Qantica's</span> vision is to fluidly integrate the worlds of Film, TV and Video Games into valuable, long-lasting IPs.
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

        {/* Sistema de contenido (condicional en móvil) */}
  <div id="content-system">
      {show("hbomax") && (
    <div className="orbital-item static-item" data-item-id="hbomax">
      <img src="/logos/hbo-max.svg" alt="HBO Max" className="logo-img" />
    </div>
  )}
  {show("amazon") && (
    <div className="orbital-item static-item" data-item-id="amazon">
      <img src="/logos/amazon.svg" alt="Amazon Prime Video" className="logo-img" />
    </div>
  )}
  {show("paramount") && (
    <div className="orbital-item static-item" data-item-id="paramount">
      <img src="/logos/paramount.svg" alt="Paramount+" className="logo-img" />
    </div>
  )}
  {show("a24") && (
    <div className="orbital-item static-item" data-item-id="a24">
      <img src="/logos/a24.svg" alt="A24" className="logo-img" />
    </div>
  )}
  {show("netflix") && (
    <div className="orbital-item static-item" data-item-id="netflix">
      <img src="/logos/netflix.svg" alt="Netflix" className="logo-img" />
    </div>
  )}
  {show("disney") && (
    <div className="orbital-item static-item" data-item-id="disney">
      <img src="/logos/disney-plus.svg" alt="Disney+" className="logo-img" />
    </div>
  )}

  {/* YouTube rojo + logo (siempre) */}
  <div className="orbital-item moving-item" data-item-id="youtube" title="YouTube">
    <img src="/logos/youtube.svg" alt="YouTube" className="logo-img" />
  </div>

  {show("appletv") && (
    <div className="orbital-item static-item" data-item-id="appletv">
      <img src="/logos/apple-tv.svg" alt="Apple TV+" className="logo-img" />
    </div>
  )}
  {show("imdb") && (
    <div className="orbital-item static-item" data-item-id="imdb">
      <img src="/logos/imdb.svg" alt="IMDb" className="logo-img" />
    </div>
  )}
  {show("animoca") && (
    <div className="orbital-item static-item" data-item-id="animoca">
      <img src="/logos/animoca.svg" alt="Animoca Brands" className="logo-img" />
    </div>
  )}
  {show("story") && (
    <div className="orbital-item static-item" data-item-id="story">
      <img src="/logos/story.svg" alt="Story" className="logo-img" />
    </div>
  )}
  {show("angelstudios") && (
    <div className="orbital-item static-item" data-item-id="angelstudios">
      <img src="/logos/angel-studios.svg" alt="Angel Studios" className="logo-img" />
    </div>
  )}
  {show("patreon") && (
    <div className="orbital-item static-item" data-item-id="patreon">
      <img src="/logos/patreon.svg" alt="Patreon" className="logo-img" />
    </div>
  )}
  {show("mubi") && (
    <div className="orbital-item static-item" data-item-id="mubi">
      <img src="/logos/mubi.svg" alt="MUBI" className="logo-img" />
    </div>
  )}
  {show("rockstargames") && (
    <div className="orbital-item static-item" data-item-id="rockstargames">
      <img src="/logos/rockstar-games.svg" alt="Rockstar Games" className="logo-img" />
    </div>
  )}
  {show("roblox") && (
    <div className="orbital-item static-item" data-item-id="roblox">
      <img src="/logos/roblox.svg" alt="Roblox" className="logo-img" />
    </div>
  )}
</div>

      </div>

      {/* Modal */}
      <div id="info-modal" className="modal-overlay" ref={modalRef}>
        <div className="modal-content" id="modal-content">
          <button
            className="modal-close"
            onClick={() => ((modalRef.current as HTMLDivElement).style.display = "none")}
          >
            &times;
          </button>
          <h3 id="modal-title">Título del Item</h3>
          <p id="modal-description">Descripción detallada del ítem.</p>
        </div>
      </div>

      {/* Estilos scoped al componente */}
      <style>{`
        .orbit-wrapper { --center-radius:65px; --item-size:70px; --container-size:600px; --center-offset:300px; --orbit-path-size: min(90vw, 530px); }
        .orbit-wrapper .container{
          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:min(90vw, 600px); height:min(90vw, 600px);
          display:flex; justify-content:center; align-items:center; z-index:1;
        }
        .orbit-wrapper .text-frame{position:absolute; z-index:10; width:280px; padding:16px; background:rgba(0,0,0,0.8); border-radius:12px; border:1px solid rgba(255,215,0,.4); box-shadow:0 4px 30px rgba(0,0,0,.9); backdrop-filter:blur(10px);}
        .orbit-wrapper .line-label{color:#D1D5DB; font-size:13px; font-weight:500; line-height:1.3; text-shadow:0 0 5px rgba(209,213,219,.3);}
        .orbit-wrapper .highlight-yellow{color:#FFD700; text-shadow:0 0 8px rgba(255,215,0,.7);}
        .orbit-wrapper .frame-top{top:20px; right:20px; text-align:right;}
        .orbit-wrapper .frame-bottom{bottom:20px; left:20px; text-align:left;}
        .orbit-wrapper .background-line{position:absolute; width:80%; max-width:700px; height:2px; background:#FFD700; z-index:0; top:50%; left:50%; transform:translate(-50%,-50%) rotate(-45deg);}
        .orbit-wrapper .center-circle{width:130px; height:130px; border:6px solid #FFD700; border-radius:50%; display:flex; justify-content:center; align-items:center; position:absolute; z-index:2; box-shadow:0 0 30px rgba(255,215,0,.6); background-color:rgba(0,0,0,.4); cursor:default; transition:all .2s ease-out;}
        .orbit-wrapper .center-circle:hover{transform:scale(1.05); box-shadow:0 0 50px rgba(255,215,0,.8);}
        .orbit-wrapper .center-circle::before{content:'Q'; color:#FFD700; font-size:90px; font-weight:900; text-shadow:0 0 15px rgba(255,215,0,1);}
        .orbit-wrapper .orbit-path{position:absolute; width:var(--orbit-path-size); height:var(--orbit-path-size); border:2px solid #FFD700; border-radius:50%; z-index:1;}
        .orbit-wrapper .orbital-item{
          position:absolute; width:70px; height:70px; border-radius:50%;
          display:flex; justify-content:center; align-items:center;
          font-size:12px; font-weight:bold; color:black; text-align:center; padding:5px; box-sizing:border-box; cursor:pointer;
          top:50%; left:50%; transform:translate(-50%,-50%); transition:all .2s ease-out; z-index:3;
          background:#D1D5DB; /* fondo Amazon para todos */
          box-shadow:0 0 15px rgba(255,215,0,.4),0 0 25px rgba(255,215,0,.25);
        }
        .orbit-wrapper .moving-item{background:#FF0000 !important; color:white; box-shadow:0 0 20px rgba(255,0,0,1),0 0 40px rgba(255,0,0,.7);}
        .orbit-wrapper .orbital-item:hover{transform:translate(-50%,-50%) scale(1.08);}
        .orbit-wrapper .modal-overlay{display:none; position:fixed; inset:0; background:rgba(0,0,0,.8); z-index:1000; justify-content:center; align-items:center;}
        .orbit-wrapper .modal-content{background:#1a1a1a; color:#D1D5DB; padding:30px; border-radius:15px; width:90%; max-width:450px; box-shadow:0 0 50px rgba(255,215,0,.7); border:2px solid #FFD700; animation:fadeIn .3s ease-out;}
        @keyframes fadeIn{from{opacity:0; transform:scale(.95);} to{opacity:1; transform:scale(1);}}
        .orbit-wrapper .modal-content h3{color:#FFD700; margin-top:0; border-bottom:2px solid #333; padding-bottom:10px;}
        .orbit-wrapper .modal-close{float:right; font-size:24px; font-weight:bold; line-height:1; color:#FFD700; cursor:pointer; border:none; background:none; margin-left:10px;}
        .orbit-wrapper .logo-img{width:70%; height:70%; object-fit:contain; display:block; pointer-events:none;}

        /* Responsive: reduce Q y nodos en pantallas pequeñas */
        @media (max-width: 480px) {
          .orbit-wrapper { min-height: 520px; }
          .orbit-wrapper .center-circle{width:100px; height:100px;}
          .orbit-wrapper .center-circle::before{font-size:72px;}
          .orbit-wrapper .orbital-item{width:55px; height:55px; font-size:10px;}
          .orbit-wrapper .container{width:min(92vw, 520px); height:min(92vw, 520px);}
          .orbit-wrapper .background-line{width:85%;}
        }
      `}</style>
    </div>
  );
};

export default OrbitSystemV4;
