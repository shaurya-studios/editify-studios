"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type DeviceMode = "pc" | "phone";

interface DeviceModeContextType {
  mode: DeviceMode;
  toggleMode: () => void;
  isPhone: boolean;
}

const DeviceModeContext = createContext<DeviceModeContextType | undefined>(undefined);

export function DeviceModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<DeviceMode>("pc");

  useEffect(() => {
    // Check if device is primarily a mobile/touch device by default
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmallScreen = window.innerWidth < 768;
    if (isTouch || isSmallScreen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode("phone");
    }
  }, []);

  const toggleMode = () => {
    setMode((prev) => (prev === "pc" ? "phone" : "pc"));
  };

  return (
    <DeviceModeContext.Provider value={{ mode, toggleMode, isPhone: mode === "phone" }}>
      {children}
    </DeviceModeContext.Provider>
  );
}

export function useDeviceMode() {
  const context = useContext(DeviceModeContext);
  if (context === undefined) {
    throw new Error("useDeviceMode must be used within a DeviceModeProvider");
  }
  return context;
}
