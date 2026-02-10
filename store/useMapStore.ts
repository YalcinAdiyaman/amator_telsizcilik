import { create } from 'zustand';

export type MapObject =
    | { type: 'REPEATER'; data: any }
    | { type: 'SATELLITE'; data: any }
    | null;

interface MapState {
    selectedObject: MapObject;

    // Actions
    selectObject: (obj: MapObject) => void;
}

export const useMapStore = create<MapState>((set) => ({
    selectedObject: null,
    selectObject: (obj) => set({ selectedObject: obj }),
}));
