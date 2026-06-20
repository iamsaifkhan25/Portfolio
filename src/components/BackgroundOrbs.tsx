import React from "react";

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#030712]">
      {/* Dark mesh background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Indigo glowing orb */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] rounded-full bg-indigo-600/10 blur-[80px] md:blur-[120px] animate-float-slow" />

      {/* Violet glowing orb */}
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] rounded-full bg-violet-600/8 blur-[90px] md:blur-[140px] animate-float-medium" />

      {/* Blue/Cyan accent orb in the center-left */}
      <div className="absolute top-[40%] left-[20%] w-[35vw] h-[35vw] min-w-[250px] min-h-[250px] rounded-full bg-cyan-600/5 blur-[80px] md:blur-[100px] animate-float-fast" />

      {/* Ambient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/50 to-[#030712]" />
    </div>
  );
}
