/**
 * FinalMessage component - Intimate romantic message
 * Displays "Eres mi mundo" with subtle animations
 */
export default function FinalMessage() {
    return (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
            <p
                className="text-white/90 text-3xl md:text-5xl animate-pulse-gentle drop-shadow-lg"
                style={{ fontFamily: "'Great Vibes', cursive" }}
            >
                Eres mi mundo
            </p>
        </div>
    );
}
