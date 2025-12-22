import { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
    trail: { x: number; y: number; alpha: number }[];
}

interface Firework {
    x: number;
    y: number;
    targetY: number;
    color: string;
    particles: Particle[];
    exploded: boolean;
}

/**
 * Fireworks component - Realistic fireworks celebration
 * Features particle physics, trails, and city silhouette
 */
export default function Fireworks() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const fireworksRef = useRef<Firework[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        // Fade in animation
        setTimeout(() => setIsVisible(true), 500);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Firework colors - vibrant and festive
        const colors = [
            '#FFD700', // Gold
            '#FF6B6B', // Red
            '#4ECDC4', // Turquoise
            '#95E1D3', // Mint
            '#F38181', // Pink
            '#AA96DA', // Purple
            '#FCBAD3', // Light pink
            '#FFFFD2', // Light yellow
        ];

        // Launch a new firework
        const launchFirework = () => {
            const firework: Firework = {
                x: Math.random() * canvas.width,
                y: canvas.height,
                targetY: Math.random() * canvas.height * 0.3 + 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                particles: [],
                exploded: false,
            };
            fireworksRef.current.push(firework);
        };

        // Create explosion particles
        const explode = (firework: Firework) => {
            const particleCount = 40 + Math.random() * 30; // Reduced to 40-70 particles
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = 2 + Math.random() * 3;

                firework.particles.push({
                    x: firework.x,
                    y: firework.targetY,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    alpha: 1,
                    color: firework.color,
                    trail: [],
                });
            }
        };

        // Animation loop
        const animate = () => {
            // Semi-transparent black for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Slightly faster fade for trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw fireworks
            fireworksRef.current = fireworksRef.current.filter((firework) => {
                if (!firework.exploded) {
                    // Rising firework
                    firework.y -= 5;

                    // Draw rising firework
                    ctx.beginPath();
                    ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = firework.color;
                    ctx.fill();

                    if (firework.y <= firework.targetY) {
                        explode(firework);
                        firework.exploded = true;
                    }
                } else {
                    // Update and draw particles
                    let hasVisibleParticles = false;

                    firework.particles.forEach((particle) => {
                        if (particle.alpha > 0) {
                            hasVisibleParticles = true;

                            // Update trail
                            particle.trail.push({ x: particle.x, y: particle.y, alpha: particle.alpha });
                            if (particle.trail.length > 8) particle.trail.shift(); // Shorter trails

                            // Draw trail
                            particle.trail.forEach((point, index) => {
                                const trailAlpha = (index / particle.trail.length) * point.alpha;
                                ctx.beginPath();
                                ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2); // Smaller trails
                                ctx.fillStyle = particle.color + Math.floor(trailAlpha * 255).toString(16).padStart(2, '0');
                                ctx.fill();
                            });

                            // Draw particle
                            ctx.beginPath();
                            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                            ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
                            ctx.fill();

                            // Physics
                            particle.vy += 0.05; // Gravity
                            particle.x += particle.vx;
                            particle.y += particle.vy;
                            particle.vx *= 0.98; // Air resistance
                            particle.vy *= 0.98;
                            particle.alpha -= 0.015; // Faster fade out
                        }
                    });

                    return hasVisibleParticles;
                }

                return true;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Launch fireworks at intervals
        const launchInterval = setInterval(() => {
            // Launch 5-8 fireworks at once for more spectacle
            const count = Math.floor(Math.random() * 4) + 5;
            for (let i = 0; i < count; i++) {
                setTimeout(() => launchFirework(), i * 100);
            }
        }, 1500); // Slightly longer interval to allow cleanup

        animate();

        return () => {
            clearInterval(launchInterval);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* City silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900/80 to-transparent">
                <svg
                    className="absolute bottom-0 w-full h-full"
                    viewBox="0 0 1200 200"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,200 L0,120 L100,120 L100,80 L150,80 L150,100 L200,100 L200,60 L280,60 L280,90 L320,90 L320,110 L380,110 L380,70 L450,70 L450,120 L520,120 L520,85 L600,85 L600,110 L680,110 L680,75 L750,75 L750,95 L820,95 L820,115 L900,115 L900,80 L980,80 L980,100 L1050,100 L1050,125 L1120,125 L1120,90 L1200,90 L1200,200 Z"
                        fill="rgba(0, 0, 0, 0.7)"
                    />
                </svg>
            </div>

            {/* Canvas for fireworks */}
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* "Feliz Navidad" text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1
                    className="text-white text-6xl md:text-9xl animate-fade-in-scale z-10 drop-shadow-2xl"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                    Feliz Navidad Dowmcity 💖
                </h1>
            </div>
        </div>
    );
}
