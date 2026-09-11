import { useEffect, useState } from "react";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Cinematic Sequence Timing
    const t1 = setTimeout(() => setStep(1), 300); // "NOT TO BE KNOWN"
    const t2 = setTimeout(() => setStep(2), 1800); // "BUT TO BE REMEMBERED"
    const t3 = setTimeout(() => setStep(3), 3300); // Logo Reveal
    const t4 = setTimeout(() => setFade(true), 4800); // Slide up curtain
    const t5 = setTimeout(() => setLoading(false), 5800); // Remove from DOM

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
        fade ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className={`relative flex h-full w-full items-center justify-center transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
        
        {/* Step 1 */}
        <h1 className={`font-askan absolute px-4 text-center text-3xl tracking-[0.2em] text-ink transition-all duration-700 sm:text-5xl lg:text-7xl ${step === 1 ? 'scale-100 blur-none opacity-100' : 'pointer-events-none scale-110 blur-md opacity-0'}`}>
          NOT TO BE <span className="text-primary">KNOWN</span>
        </h1>

        {/* Step 2 */}
        <h1 className={`font-askan absolute px-4 text-center text-3xl tracking-[0.2em] text-ink transition-all duration-700 sm:text-5xl lg:text-7xl ${step === 2 ? 'scale-100 blur-none opacity-100' : 'pointer-events-none scale-110 blur-md opacity-0'}`}>
          BUT TO BE <span className="text-primary">REMEMBERED</span>
        </h1>

        {/* Step 3 */}
        <div className={`absolute flex flex-col items-center gap-8 transition-all duration-1000 ${step >= 3 ? 'scale-100 blur-none opacity-100' : 'pointer-events-none scale-95 blur-md opacity-0'}`}>
          {/* Animated logo */}
          <div className="relative h-40 w-40 overflow-hidden sm:h-56 sm:w-56">
            <img src="/src/assets/logo-nobg.png" alt="Unity Cup Logo" className="h-full w-full object-contain" />
            <div className="absolute top-0 left-[-100%] h-full w-[50%] animate-[marquee_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          {/* Sleek Loading bar */}
          <div className="h-[1px] w-32 overflow-hidden rounded-full bg-black/30">
            <div className={`h-full w-full origin-left bg-primary ${step >= 3 ? 'animate-[scale-x-right_1.2s_cubic-bezier(0.87,0,0.13,1)_forwards]' : ''}`} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
