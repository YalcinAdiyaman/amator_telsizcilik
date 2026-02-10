"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { divIcon } from "leaflet";
import { repeaterData } from "@/lib/repeater-data";
import { Maidenhead } from "@/lib/maidenhead";
import SatelliteManager from "./SatelliteManager";
import TerminatorLayer from "./TerminatorLayer";
import { useMapStore } from "@/store/useMapStore";
import ObjectInfoPanel from "./HUD/ObjectInfoPanel";
import SpaceWeatherPanel from "./HUD/SpaceWeatherPanel";
import DXLayer from "./Layers/DXLayer";
import MatrixLog from "./HUD/MatrixLog"; // IMPORT ADDED
import { Layers, Globe, Radio, Eye, EyeOff, Wifi, Sun, Activity } from "lucide-react";

// Helper to create custom icon based on status and zoom level
const createCustomIcon = (status: string, callsign: string, zoom: number) => {
    const colorVar = status === "ACTIVE"
        ? "var(--primary-500)"
        : status === "MAINTENANCE"
            ? "var(--warning)"
            : "var(--error)";

    // LOW ZOOM: Simple Dot, No Glow, No Text
    if (zoom < 6) {
        return divIcon({
            className: "bg-transparent",
            html: `<div class="w-2 h-2 rounded-full shadow-[0_0_2px_black]" style="background-color: ${colorVar}"></div>`,
            iconSize: [8, 8],
            iconAnchor: [4, 4],
        });
    }

    // HIGH ZOOM: Detailed Icon with Glow and Callsign
    return divIcon({
        className: "bg-transparent",
        html: `<div class="relative w-6 h-6 flex items-center justify-center group">
            <div class="absolute inset-0 rounded-full opacity-30 animate-pulse" style="background-color: ${colorVar}"></div>
            <div class="w-3 h-3 rounded-sm rotate-45" style="background-color: ${colorVar}; box-shadow: 0 0 10px ${colorVar}"></div>
            <div class="absolute -top-6 -left-8 w-24 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-center font-bold tracking-wider pointer-events-none" style="color: ${colorVar}; text-shadow: 0 0 5px black; background: rgba(0,0,0,0.5); padding: 2px 4px; border-radius: 4px;">
               ${callsign}
            </div>
         </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

function MapController({ onMouseMove, onZoomChange }: { onMouseMove: (lat: number, lng: number) => void, onZoomChange: (zoom: number) => void }) {
    useMapEvents({
        mousemove(e) {
            onMouseMove(e.latlng.lat, e.latlng.lng);
        },
        zoomend(e) {
            onZoomChange(e.target.getZoom());
        }
    });
    return null;
}

export default function LeafletMap() {
    const [cursorPos, setCursorPos] = useState({ lat: 39.0, lng: 35.0 });
    const [qth, setQth] = useState("KN41");
    const [zoom, setZoom] = useState(6); // Default zoom

    // Layer Visibility States
    const [showSatellites, setShowSatellites] = useState(true);
    const [showRepeaters, setShowRepeaters] = useState(true);
    const [showDX, setShowDX] = useState(false); // DEFAULT FALSE

    const { selectObject, selectedObject } = useMapStore();

    return (
        <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-black group">

            {/* HUD Borders */}
            <div className="absolute inset-0 pointer-events-none z-20 border-[20px] border-transparent mask-image-gradient"></div>

            {/* HUD Panels */}
            <ObjectInfoPanel />
            <SpaceWeatherPanel /> {/* Self-managed visibility */}
            <MatrixLog /> {/* NEW COMPONENT */}

            {/* MAIN MAP CONTAINER */}
            <MapContainer
                center={[39.0, 35.0]}
                zoom={6}
                scrollWheelZoom={true}
                className="w-full h-full z-10 outline-none"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    className="[filter:brightness(1.2)_contrast(1.1)_saturate(0.8)]"
                />

                <TerminatorLayer />

                {/* CONDITIONAL LAYERS */}
                {showSatellites && <SatelliteManager />}
                {showDX && <DXLayer />}

                <MapController
                    onMouseMove={(lat, lng) => {
                        setCursorPos({ lat, lng });
                        setQth(Maidenhead.toLocator(lat, lng));
                    }}
                    onZoomChange={setZoom}
                />

                {/* Render Repeater Markers */}
                {showRepeaters && repeaterData.map((repeater) => (
                    <Marker
                        key={repeater.id}
                        position={repeater.coordinates}
                        icon={createCustomIcon(repeater.status, repeater.callsign, zoom)}
                        eventHandlers={{
                            click: () => {
                                selectObject({
                                    type: 'REPEATER',
                                    data: repeater
                                });
                            }
                        }}
                    >
                    </Marker>
                ))}

                {/* Coverage Circle for Selected Repeater - Only if Repeaters are shown */}
                {showRepeaters && selectedObject?.type === 'REPEATER' && (
                    <Circle
                        center={selectedObject.data.coordinates}
                        radius={Math.sqrt(selectedObject.data.altitude) * 4124}
                        pathOptions={{
                            color: 'var(--success)',
                            weight: 1,
                            dashArray: '5, 10',
                            fillColor: 'var(--success)',
                            fillOpacity: 0.1,
                            className: 'animate-pulse-slow'
                        }}
                    />
                )}

            </MapContainer>

            {/* OVERLAYS & UI CONTROLS */}

            {/* Radar Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-radar-grid opacity-10 mix-blend-screen" />

            {/* Top Left Stats */}
            <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur border border-[var(--primary-500)]/30 p-3 rounded-sm min-w-[200px]">
                <div className="text-[10px] text-[var(--primary-500)] font-mono tracking-widest mb-1 flex items-center justify-between">
                    <span>KOORDİNATLAR</span>
                    <span className="animate-pulse w-2 h-2 rounded-full bg-[var(--success)]"></span>
                </div>
                <div className="text-sm text-white font-mono flex flex-col gap-1">
                    <span className="text-[var(--text-secondary)]">ENLEM: <span className="text-white">{cursorPos.lat.toFixed(4)}° N</span></span>
                    <span className="text-[var(--text-secondary)]">BOYLAM: <span className="text-white">{cursorPos.lng.toFixed(4)}° E</span></span>
                    <div className="mt-2 text-xs border-t border-[var(--primary-500)]/20 pt-1">
                        <span className="text-[var(--secondary-500)] font-bold">QTH: {qth}</span>
                    </div>
                </div>
            </div>

            {/* BOTTOM CONTROL PANEL (Layer Toggles) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
                <div className="flex gap-4 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl items-center">

                    {/* Satellite */}
                    <button
                        onClick={() => setShowSatellites(!showSatellites)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${showSatellites
                                ? "bg-[var(--primary-500)]/20 border border-[var(--primary-500)]/50 text-[var(--primary-500)]"
                                : "bg-transparent border border-transparent text-gray-500 hover:bg-white/5"
                            }`}
                        title="Uyduları Gizle/Göster"
                    >
                        <Globe size={18} />
                        <div className={`w-1.5 h-1.5 rounded-full ${showSatellites ? 'bg-[var(--primary-500)] shadow-[0_0_5px_var(--primary-500)]' : 'bg-gray-700'}`}></div>
                    </button>

                    <div className="w-[1px] bg-white/10 h-6"></div>

                    {/* Repeaters */}
                    <button
                        onClick={() => setShowRepeaters(!showRepeaters)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${showRepeaters
                                ? "bg-[var(--secondary-500)]/20 border border-[var(--secondary-500)]/50 text-[var(--secondary-500)]"
                                : "bg-transparent border border-transparent text-gray-500 hover:bg-white/5"
                            }`}
                        title="Röleleri Gizle/Göster"
                    >
                        <Radio size={18} />
                        <div className={`w-1.5 h-1.5 rounded-full ${showRepeaters ? 'bg-[var(--secondary-500)] shadow-[0_0_5px_var(--secondary-500)]' : 'bg-gray-700'}`}></div>
                    </button>

                    <div className="w-[1px] bg-white/10 h-6"></div>

                    {/* DX Toggle */}
                    <button
                        onClick={() => setShowDX(!showDX)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${showDX
                                ? "bg-[#00ffea]/20 border border-[#00ffea]/50 text-[#00ffea] shadow-[0_0_10px_rgba(0,255,234,0.3)]"
                                : "bg-transparent border border-transparent text-gray-500 hover:bg-white/5"
                            }`}
                        title="Canlı DX Telsiz Görüşmelerini Aç"
                    >
                        <Wifi size={18} />
                        <span className="text-[10px] font-bold tracking-wider hidden sm:block">DX</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${showDX ? 'bg-[#00ffea] shadow-[0_0_5px_#00ffea]' : 'bg-gray-700'}`}></div>
                    </button>

                    {/* Solar Toggle REMOVED - Controlled internally by SpaceWeatherPanel */}

                </div>
            </div>

            {/* Legend (Bottom Right) */}
            <div className="absolute bottom-8 right-8 z-20 pointer-events-none hidden md:block">
                <div className="bg-black/80 backdrop-blur border border-[var(--border-subtle)] p-3 rounded text-[10px] font-mono text-[var(--text-muted)] w-48 shadow-xl">
                    <h4 className="border-b border-white/10 pb-1 mb-2 text-white tracking-widest">LEJANT</h4>
                    {showRepeaters && (
                        <>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-sm rotate-45 bg-[var(--primary-500)] shadow-[0_0_5px_var(--primary-500)]"></span>
                                <span>AKTİF RÖLE</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-sm rotate-45 bg-[var(--warning)] shadow-[0_0_5px_var(--warning)]"></span>
                                <span>BAKIMDA</span>
                            </div>
                        </>
                    )}
                    {showSatellites && (
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-white/10 border border-[var(--primary-500)] shadow-[0_0_5px_var(--primary-500)]"></span>
                            <span className="text-[var(--primary-500)] font-bold">ISS YÖRÜNGESİ</span>
                        </div>
                    )}
                    {showDX && (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-0.5 bg-[#00ffea] shadow-[0_0_5px_#00ffea]"></span>
                            <span className="text-[#00ffea] font-bold">CANLI DX HAVASI</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                        <span className="w-2 h-2 rounded-full bg-[var(--success)]/20 border border-[var(--success)]"></span>
                        <span className="text-[var(--success)]">KAPSAMA</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
