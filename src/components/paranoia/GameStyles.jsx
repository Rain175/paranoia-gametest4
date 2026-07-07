import React from "react";

export default function GameStyles() {
  return (
    <style>{`
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .shimmer-text {
        background: linear-gradient(90deg, #a78bfa, #ec4899, #06b6d4, #a78bfa);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradient-shift 3s ease infinite;
      }
      .pulse-btn {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      .spin-coin {
        animation: spin-coin-anim 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      @keyframes spin-coin-anim {
        0% { transform: rotateY(0deg) rotateX(0deg); }
        100% { transform: rotateY(720deg) rotateX(360deg); }
      }
      .glass {
        background: rgba(24, 24, 27, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(63, 63, 70, 0.4);
      }
      .glass-strong {
        background: rgba(39, 39, 42, 0.8);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(82, 82, 91, 0.5);
      }
    `}</style>
  );
}