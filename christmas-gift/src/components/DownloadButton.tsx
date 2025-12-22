import { useState } from 'react';

/**
 * DownloadButton component - Elegant button for downloading gift
 * Features smooth hover animations and minimalist design
 */
export default function DownloadButton() {
    const [isHovered, setIsHovered] = useState(false);

    const handleDownload = () => {
        // Create a heart-shaped text file as a gift placeholder
        const giftContent = `
    ❤️ Mi Regalo Especial Para Ti ❤️
    
    Este es un mensaje desde el corazón.
    
    En esta Navidad quiero que sepas que eres
    la persona más importante en mi vida.
    
    Cada momento contigo es un regalo.
    
    Te amo mucho.
    
    ❤️ Feliz Navidad 2025 ❤️
    `;

        const blob = new Blob([giftContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'regalo-especial.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-32 z-20">
            <button
                onClick={handleDownload}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
          px-8 py-4 
          bg-white/10 backdrop-blur-md
          border-2 border-white/30
          rounded-full
          text-white text-lg md:text-xl
          transition-all duration-500 ease-out
          hover:bg-white/20 hover:border-white/50 hover:scale-105
          hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
          active:scale-95
          ${isHovered ? 'tracking-wider' : 'tracking-wide'}
        `}
                style={{ fontFamily: "'Dancing Script', cursive" }}
            >
                Descargar regalo
            </button>
        </div>
    );
}
