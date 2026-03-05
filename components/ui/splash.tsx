"use client";

import { useState } from "react";
import IntroSplash from "@/components/ui/intro-splash";
import clsx from "clsx";

export default function Splash({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <IntroSplash onFinish={() => setReady(true)} />}

      <div
        className={clsx(
          "transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {children}
      </div>
    </>
  );
}
