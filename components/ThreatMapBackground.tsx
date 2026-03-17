"use client";

import { useEffect, useRef, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  type: "node" | "threat" | "safe";
  active: boolean;
  activeCooldown: number;
}

interface Connection {
  from: number;
  to: number;
  progress: number;
  speed: number;
  active: boolean;
  color: string;
}

interface ThreatMapBackgroundProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  threatFrequency?: number; // ms between new threats
}

export function ThreatMapBackground({
  className = "",
  nodeCount = 60,
  connectionDistance = 180,
  threatFrequency = 2000,
}: ThreatMapBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const lastThreatRef = useRef<number>(0);

  const COLORS = {
    primary: "#0070F3",
    cyan: "#00D4FF",
    accent: "#00FF88",
    danger: "#FF3366",
    warning: "#FF6B00",
    nodeDim: "rgba(0, 112, 243, 0.15)",
    lineBase: "rgba(0, 212, 255, 0.08)",
    lineActive: "rgba(0, 112, 243, 0.6)",
    lineThreat: "rgba(255, 51, 102, 0.7)",
    lineSafe: "rgba(0, 255, 136, 0.6)",
  };

  const initPoints = useCallback((width: number, height: number) => {
    pointsRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
      type: "node",
      active: false,
      activeCooldown: 0,
    }));
  }, [nodeCount]);

  const spawnThreat = useCallback(() => {
    const points = pointsRef.current;
    if (!points.length) return;

    // Pick a random source
    const from = Math.floor(Math.random() * points.length);
    // Pick a random target within connection distance
    const candidates: number[] = [];
    for (let i = 0; i < points.length; i++) {
      if (i === from) continue;
      const dx = points[i].x - points[from].x;
      const dy = points[i].y - points[from].y;
      if (Math.sqrt(dx * dx + dy * dy) < connectionDistance * 1.5) {
        candidates.push(i);
      }
    }
    if (!candidates.length) return;
    const to = candidates[Math.floor(Math.random() * candidates.length)];

    // Mark source as threat
    points[from].type = "threat";
    points[from].active = true;
    points[from].activeCooldown = 80;

    // Create animated connection
    const isThreat = Math.random() > 0.35;
    connectionsRef.current.push({
      from,
      to,
      progress: 0,
      speed: 0.008 + Math.random() * 0.012,
      active: true,
      color: isThreat ? COLORS.lineThreat : COLORS.lineSafe,
    });

    // Limit connection pool
    if (connectionsRef.current.length > 40) {
      connectionsRef.current = connectionsRef.current.slice(-40);
    }
  }, [connectionDistance, COLORS.lineThreat, COLORS.lineSafe]);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);

    const points = pointsRef.current;
    const connections = connectionsRef.current;

    // Spawn new threats
    if (timestamp - lastThreatRef.current > threatFrequency) {
      spawnThreat();
      lastThreatRef.current = timestamp;
    }

    // Update point positions
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      p.pulsePhase += 0.02;

      // Bounce off edges
      if (p.x < 0 || p.x > width)  p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));

      // Cool down active state
      if (p.activeCooldown > 0) {
        p.activeCooldown--;
        if (p.activeCooldown === 0) {
          p.active = false;
          p.type = "node";
        }
      }
    }

    // Draw static connections (proximity)
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[j].x - points[i].x;
        const dy = points[j].y - points[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw animated connections (threats/responses)
    for (let i = connections.length - 1; i >= 0; i--) {
      const conn = connections[i];
      if (!conn.active) continue;

      conn.progress += conn.speed;

      const from = points[conn.from];
      const to = points[conn.to];
      const currentX = from.x + (to.x - from.x) * conn.progress;
      const currentY = from.y + (to.y - from.y) * conn.progress;

      // Draw trail
      const gradient = ctx.createLinearGradient(from.x, from.y, currentX, currentY);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.6, conn.color.replace("0.7", "0.2").replace("0.6", "0.15"));
      gradient.addColorStop(1, conn.color);

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw moving dot
      ctx.beginPath();
      ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = conn.color;
      ctx.fill();

      if (conn.progress >= 1) {
        conn.active = false;
        // Mark destination
        points[conn.to].active = true;
        points[conn.to].activeCooldown = 60;
        points[conn.to].type = conn.color.includes("FF3366") ? "threat" : "safe";
        connections.splice(i, 1);
      }
    }

    // Draw nodes
    for (const p of points) {
      const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;
      let color: string;
      let size = p.size;
      let glowRadius = 0;

      if (p.active) {
        if (p.type === "threat") {
          color = COLORS.danger;
          size = p.size * 2.5;
          glowRadius = 15;
        } else if (p.type === "safe") {
          color = COLORS.accent;
          size = p.size * 2;
          glowRadius = 12;
        } else {
          color = COLORS.primary;
          size = p.size * 1.8;
          glowRadius = 10;
        }
      } else {
        color = COLORS.cyan;
        size = p.size;
      }

      // Glow
      if (glowRadius > 0) {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius * pulse);
        glow.addColorStop(0, color.replace(")", ", 0.4)").replace("#", "rgba(").replace("FF3366", "255, 51, 102").replace("00FF88", "0, 255, 136").replace("0070F3", "0, 112, 243"));
        glow.addColorStop(1, "transparent");
        // Draw glow as circle fill
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius * pulse, 0, Math.PI * 2);

        // Simple radial gradient fill for glow
        if (p.type === "threat") {
          ctx.fillStyle = `rgba(255, 51, 102, ${0.08 * pulse})`;
        } else if (p.type === "safe") {
          ctx.fillStyle = `rgba(0, 255, 136, ${0.08 * pulse})`;
        } else {
          ctx.fillStyle = `rgba(0, 112, 243, ${0.08 * pulse})`;
        }
        ctx.fill();
      }

      // Node dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * pulse, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = p.active ? 0.9 : p.opacity * pulse;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }, [connectionDistance, spawnThreat, threatFrequency, COLORS]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initPoints(canvas.width, canvas.height);
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    let running = true;
    const loop = (timestamp: number) => {
      if (!running) return;
      draw(timestamp);
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [initPoints, draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`threat-map ${className}`}
      aria-hidden="true"
    />
  );
}

export default ThreatMapBackground;
