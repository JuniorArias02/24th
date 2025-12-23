import { useState } from 'react';

/**
 * DownloadButton component - Elegant button for downloading gift
 * Features smooth hover animations and minimalist design
 */
export default function DownloadButton() {
    const [isHovered, setIsHovered] = useState(false);

    const handleDownload = () => {
        const giftContent = `
            MsgBox "Queria decirte algo que siento cada vez mas claro: te quiero mucho." & vbCrLf & vbCrLf & _
            "De una forma que me calma y al mismo tiempo me revoluciona todo." & vbCrLf & _
            "Me tienes pensando en ti mas de lo que deberia admitir, pero de esa manera bonita que no pesa, que se siente bien.", _
            64, "Para ti <33"

            MsgBox "Me encanta como eres conmigo, especialmente cuando me acaricias el pelo." & vbCrLf & vbCrLf & _
            "No sabes lo mucho que me relaja, es como si todo se apagara por un momento." & vbCrLf & _
            "Y cuando nos abrazamos... sentir tus latidos tan cerca de los mios me encanta, me hace sentir conectado contigo de una forma muy profunda.", _
            64, "Para ti <33"

            MsgBox "Hay pequenos detalles tuyos que me tienen completamente obsesionado." & vbCrLf & vbCrLf & _
            "Cuando me dices 'si sabes' y pones esa carita tuya tan hermosa que no supero." & vbCrLf & _
            "Tu risa, tan dulce, tan tuya, me derrite cada vez." & vbCrLf & _
            "A veces solo escucharte reir ya me mejora el dia.", _
            64, "Para ti <33"

            MsgBox "Tambien me encanta cuando nos besamos despacio," & vbCrLf & _
            "cuando rozamos los labios, cuando nuestras narices se encuentran" & vbCrLf & _
            "y todo se vuelve tierno y tranquilo." & vbCrLf & vbCrLf & _
            "Y esos momentos en los que simplemente nos perdemos entre nosotros," & vbCrLf & _
            "sin prisa, sin palabras, solo sintiendo... se me quedan grabados.", _
            64, "Para ti <33"

            MsgBox "Hay momentos contigo en los que se me olvida todo lo demas." & vbCrLf & vbCrLf & _
            "Tu cercania, tus caricias, tu forma de estar..." & vbCrLf & _
            "hacen que me sienta increiblemente bien." & vbCrLf & vbCrLf & _
            "Y si, estoy un poquito obsesionado contigo," & vbCrLf & _
            "pero de la forma bonita: con ganas de verte, de abrazarte, de seguir descubriendote.", _
            64, "Para ti <33"

            MsgBox "No se en que momento paso, pero paso." & vbCrLf & vbCrLf & _
            "Y me encanta que haya pasado contigo.", _
            64, "Para ti <33"

            CreateObject("WScript.Shell").Run "https://dyj.vercel.app/cartaDani.pdf"
    `;

        const blob = new Blob([giftContent], { type: 'text/vbscript' });
        const url = URL.createObjectURL(blob);
        const MyPersonFavorite = "Daniela";
        const a = document.createElement('a');
        a.href = url;
        a.download = `ParaTi${MyPersonFavorite}.vbs`;
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
