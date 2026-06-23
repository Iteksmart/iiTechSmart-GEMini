import { useEffect, useRef } from "react";

interface InteractiveMeshProps {
  isDarkMode: boolean;
}

export default function InteractiveMesh({ isDarkMode }: InteractiveMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Node count based on container dimension density
    const nodeCount = Math.min(65, Math.floor((width * height) / 16000));
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulseSpeed: number;
      pulseState: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseState: Math.random() * Math.PI,
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      if (mouse.targetX !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Draw Grid overlay background
      const gridSize = 45;
      ctx.strokeStyle = isDarkMode ? "rgba(168, 85, 247, 0.02)" : "rgba(168, 85, 247, 0.035)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render links first (lines)
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxLinkDist = 125;
          if (dist < maxLinkDist) {
            const alpha = (1 - dist / maxLinkDist) * 0.14;
            ctx.strokeStyle = isDarkMode
              ? `rgba(168, 85, 247, ${alpha})`
              : `rgba(139, 92, 246, ${alpha * 1.4})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }

        // Connect to mouse if within distance
        if (mouse.x !== -1000) {
          const mdx = nodeA.x - mouse.x;
          const mdy = nodeA.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxMouseDist = 180;

          if (mdist < maxMouseDist) {
            const mAlpha = (1 - mdist / maxMouseDist) * 0.25;
            ctx.strokeStyle = isDarkMode
              ? `rgba(244, 114, 182, ${mAlpha})` // pink glow in dark
              : `rgba(168, 85, 247, ${mAlpha * 1.5})`; // purple in light
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Attract nodes slightly towards mouse cursor
            const force = (maxMouseDist - mdist) / maxMouseDist * 0.2;
            nodeA.x -= (mdx / mdist) * force;
            nodeA.y -= (mdy / mdist) * force;
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Update positions
        n.x += n.vx;
        n.y += n.vy;

        // Bounce boundaries
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Clamp inside canvas to avoid drift
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));

        n.pulseState += n.pulseSpeed;
        const scale = 0.8 + Math.sin(n.pulseState) * 0.35;

        // Draw node center
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * scale, 0, Math.PI * 2);
        
        if (isDarkMode) {
          // Purple neon node glow
          ctx.fillStyle = i % 4 === 0 ? "rgba(244, 114, 182, 0.95)" : "rgba(168, 85, 247, 0.95)";
          ctx.shadowBlur = 8;
          ctx.shadowColor = i % 4 === 0 ? "rgba(244, 114, 182, 0.8)" : "rgba(168, 85, 247, 0.8)";
        } else {
          ctx.fillStyle = i % 4 === 0 ? "rgba(129, 140, 248, 1)" : "rgba(109, 40, 217, 1)";
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset for next shapes
      }

      // Draw client cursor aura
      if (mouse.x !== -1000) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 100);
        gradient.addColorStop(0, isDarkMode ? "rgba(168, 85, 247, 0.08)" : "rgba(168, 85, 247, 0.11)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      id="bg-interactive-mesh-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto block transition-colors duration-500"
      style={{ mixBlendMode: isDarkMode ? "screen" : "normal" }}
    />
  );
}
