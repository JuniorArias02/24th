import { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownProps {
    onComplete: () => void;
}

/**
 * Countdown component - Shows elegant countdown to Christmas Eve 2025
 * Features smooth animations and romantic typography
 */
export default function Countdown({ onComplete }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fade in animation on mount
        setTimeout(() => setIsVisible(true), 100);

        const targetDate = new Date('2025-12-23T20:00:00').getTime();

        const calculateTimeLeft = () => {
            const now = Date.now();
            const difference = targetDate - now;

            if (difference <= 0) {
                onComplete();
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div
            className={`min-h-screen bg-black flex items-center justify-center transition-opacity duration-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className="text-center px-4">
                {/* Romantic title */}
                <h1
                    className="text-white text-5xl md:text-7xl mb-12 animate-fade-in"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                    Algo especial se acerca...
                </h1>

                {/* Countdown timer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                    {/* Days */}
                    <div className="countdown-item">
                        <div className="text-6xl md:text-8xl font-bold text-white mb-2 animate-pulse-slow">
                            {String(timeLeft.days).padStart(2, '0')}
                        </div>
                        <div
                            className="text-xl md:text-2xl text-white/80"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Días
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="countdown-item">
                        <div className="text-6xl md:text-8xl font-bold text-white mb-2 animate-pulse-slow animation-delay-200">
                            {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div
                            className="text-xl md:text-2xl text-white/80"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Horas
                        </div>
                    </div>

                    {/* Minutes */}
                    <div className="countdown-item">
                        <div className="text-6xl md:text-8xl font-bold text-white mb-2 animate-pulse-slow animation-delay-400">
                            {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div
                            className="text-xl md:text-2xl text-white/80"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Minutos
                        </div>
                    </div>

                    {/* Seconds */}
                    <div className="countdown-item">
                        <div className="text-6xl md:text-8xl font-bold text-white mb-2">
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div
                            className="text-xl md:text-2xl text-white/80"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Segundos
                        </div>
                    </div>
                </div>

                {/* Subtitle */}
                <p
                    className="text-white/60 text-2xl md:text-3xl mt-12 animate-fade-in-delayed"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                    Hasta la Navidad de 2025
                </p>
            </div>
        </div>
    );
}
