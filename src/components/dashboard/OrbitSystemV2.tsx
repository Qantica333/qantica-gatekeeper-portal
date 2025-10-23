import React, { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import styles from "./OrbitSystemV2.module.css";

type Item = {
  id: string;
  label?: string;
  img?: string;
};

/* YouTube es el único con imagen */
const ITEMS: Item[] = [
  { id: "netflix", label: "NETFLIX" },
  { id: "amazon", label: "AMAZON" },
  { id: "paramount", label: "PARAMOUNT" },
  { id: "a24", label: "A24" },
  { id: "hbomax", label: "HBO MAX" },
  { id: "disney", label: "DISNEY+" },
  { id: "youtube", img: "/logos/Logo_of_youtube.svg" },
  { id: "appletv", label: "APPLE TV+" },
  { id: "imdb", label: "IMDB" },
  { id: "animoca", label: "ANIMOCA" },
  { id: "story", label: "STORY" },
  { id: "angelstudios", label: "ANGEL" },
  { id: "patreon", label: "PATREON" },
  { id: "mubi", label: "MUBI" },
  { id: "rockstar", label: "ROCKSTAR" },
  { id: "roblox", label: "ROBLOX" },
];

const OrbitSystemV2: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const itemStates = useRef(
    ITEMS.map((item) => ({
      id: item.id,
      x: 0,
      y: 0,
      dx: Math.random() * 0.6 + 0.4,
      dy: Math.random() * 0.6 + 0.4,
    }))
  );

  const animate = () => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const radius = bounds.width / 2 - 50;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    itemStates.current.forEach((item, index) => {
      const el = container.querySelector(
        `[data-id="${item.id}"]`
      ) as HTMLElement;
      if (!el) return;

      // Movimiento solo para YouTube
      if (item.id === "youtube") {
        item.x += item.dx;
        item.y += item.dy;

        const dist = Math.hypot(item.x - centerX, item.y - centerY);
        if (dist > radius) {
          const angle = Math.atan2(item.y - centerY, item.x - centerX);
          item.x = centerX + radius * Math.cos(angle);
          item.y = centerY + radius * Math.sin(angle);
          item.dx *= -1;
          item.dy *= -1;
        }
      } else {
        // Posicionamiento circular responsivo
        const angle = (index / ITEMS.length) * Math.PI * 2;
        item.x = centerX + radius * Math.cos(angle);
        item.y = centerY + radius * Math.sin(angle);
      }

      el.style.left = `${item.x - 25}px`;
      el.style.top = `${item.y - 25}px`;
    });

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isVisible) {
      rafRef.current = requestAnimationFrame(animate);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  return (
    <div ref={elementRef} className={styles.wrapper}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.centerQ}>Q</div>

        {ITEMS.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`${styles.item} ${
              item.id === "youtube" ? styles.youtube : ""
            }`}
          >
            {item.img ? (
              <img src={item.img} className={styles.logo} alt={item.id} />
            ) : (
              item.label
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrbitSystemV2;
