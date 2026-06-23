import React from "react";

interface Logo360Props {
  darkMode?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showSubtitle?: boolean;
}

export function Logo360({
  darkMode = true,
  size = "md",
  className = "",
  showSubtitle = true,
}: Logo360Props) {
  // Dimension definitions for both text & logo icon
  const sizes = {
    sm: { 
      svgHeight: "h-6 w-6", 
      text360: "text-[12px] tracking-tight", 
      textMgmt: "text-[6.5px] tracking-[0.20em]",
      gap: "gap-1.5",
      sub: "text-[5.5px]"
    },
    md: { 
      svgHeight: "h-9 w-9", 
      text360: "text-lg tracking-normal", 
      textMgmt: "text-[8.5px] tracking-[0.22em]",
      gap: "gap-2.5",
      sub: "text-[7px]"
    },
    lg: { 
      svgHeight: "h-[3.25rem] w-[3.25rem]", 
      text360: "text-xl tracking-normal", 
      textMgmt: "text-[12px] tracking-[0.22em]",
      gap: "gap-3.5",
      sub: "text-[8px]"
    },
    xl: { 
      svgHeight: "h-22 w-22", 
      text360: "text-3xl tracking-normal", 
      textMgmt: "text-[18px] tracking-[0.22em]",
      gap: "gap-4",
      sub: "text-xs"
    },
  };

  const selectedSize = sizes[size] || sizes.md;

  // Color mappings based on theme mode to respect contrast guidelines:
  // - Official Corporate Blue for Text: #124383 / #0E386E
  // - Soft corporate text transitions for dark mode readability
  const mainTextColor = darkMode
    ? "text-slate-100"
    : "text-[#124383]";

  const mgmtTextColor = darkMode
    ? "text-[#4a90e2]"
    : "text-[#164c95]";

  const subTextColor = darkMode
    ? "text-amber-500/90"
    : "text-amber-600";

  return (
    <div className={`flex items-center select-none ${selectedSize.gap} ${className}`}>
      
      {/* Brand Text Elements (Aligned on the Left, exactly like the official logo) */}
      <div className="flex flex-col text-right leading-none select-none">
        <div className="flex flex-col leading-none">
          {/* First Line: 360HOTEL */}
          <div className={`font-light uppercase ${selectedSize.text360} ${mainTextColor}`}>
            <span className="font-extrabold tracking-tighter mr-0.5">360</span>
            <span className="font-light tracking-wide">HOTEL</span>
          </div>
          
          {/* Second Line: Management */}
          <div className={`font-semibold uppercase ${selectedSize.textMgmt} ${mgmtTextColor} mt-1`}>
            Management
          </div>
        </div>
        
        {showSubtitle && (
          <span className={`font-extrabold tracking-widest uppercase mt-2.5 ${selectedSize.sub} ${subTextColor} animate-pulse`}>
            Revenue Elements 360™
          </span>
        )}
      </div>

      {/* Official 360 Graphic Symbol (Placed on the Right) */}
      <div className={`relative ${selectedSize.svgHeight} flex-shrink-0 transition-transform duration-500 hover:scale-105`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Smooth gold gradient for the circular sweep */}
            <linearGradient id="360-gold-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE054" />
              <stop offset="45%" stopColor="#E5A93B" />
              <stop offset="100%" stopColor="#A26C08" />
            </linearGradient>

            {/* Rich gradient showing dimension in the waves swoosh */}
            <linearGradient id="360-blue-wave-gradient" x1="0.1" y1="0.8" x2="0.9" y2="0.2">
              <stop offset="0%" stopColor="#8CBEF0" />
              <stop offset="35%" stopColor="#306EB2" />
              <stop offset="75%" stopColor="#103F80" />
              <stop offset="100%" stopColor="#0B1D40" />
            </linearGradient>

            {/* Subtle inner drop shadow for depth */}
            <filter id="wave-depth-shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="-1" dy="2" stdDeviation="2" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Ambient Glow for modern feeling */}
          <circle cx="60" cy="50" r="42" fill="transparent" />

          {/* Golden Ring Circle of 360 Management */}
          <circle
            cx="60"
            cy="50"
            r="42"
            stroke="url(#360-gold-gradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-sm"
          />

          {/* Inner Abstract Crescent Swoosh Wave (Fidelity representation) */}
          <path
            d="M 36 60 
               C 36 44, 48 24, 76 24 
               C 92 24, 104 36, 104 52 
               C 104 68, 92 80, 80 80 
               C 80 80, 88 68, 86 54 
               C 84 38, 70 32, 58 32 
               C 46 32, 38 46, 36 60 Z"
            fill="url(#360-blue-wave-gradient)"
            filter="url(#wave-depth-shadow)"
          />

          {/* Additional subtle highlight layer to make the wave glossy/3D */}
          <path
            d="M 40 48 
               C 48 34, 62 28, 76 28 
               C 86 28, 94 34, 95 44 
               C 91 35, 78 32, 66 34 
               C 54 36, 44 44, 40 48 Z"
            fill="#FFFFFF"
            fillOpacity="0.2"
          />
        </svg>
      </div>

    </div>
  );
}
