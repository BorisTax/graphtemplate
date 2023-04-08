import { atom } from 'jotai'
import TouchManager from "../handlers/TouchManager";

export type ViewPortState = {
    curRealPoint: { x: number, y: number },
    curViewportPoint: { x: number, y: number },
    gridStep: number, gridStepPixels?: number,
    marginTop: number, marginLeft: number, marginBottom: number, marginRight: number,
    maxPanWidth: number, maxPanHeight: number,
    ratio: number, pixelRatio: number,
    realWidth: number, realHeight: number,
    viewPortHeight: number, viewPortWidth: number,
    selectDist: number, snapDist: number, snapMinDist: number,
    topLeft: { x: number, y: number }, bottomRight: { x: number, y: number },
    touchManager: TouchManager,
}

export const viewPortAtom = atom<ViewPortState>(getInitialState())
export const setViewPortDataAtom = atom(null, (get, set, data: ViewPortState) => { 
    set(viewPortAtom, { ...get(viewPortAtom), ...data }) 
})

function getInitialState(): ViewPortState {
    return {
        curRealPoint: { x: 0, y: 0 },
        curViewportPoint: { x: 225, y: 225 },
        gridStep: 10,
        gridStepPixels: 1,
        marginTop: 0, marginLeft: 0, marginBottom: 0, marginRight: 0,
        maxPanWidth: 3000, maxPanHeight: 3000,
        ratio: 1, pixelRatio: 1,
        realWidth: 3000, realHeight: 2600,
        viewPortHeight: 400,
        viewPortWidth: 550,
        selectDist: 2,
        snapDist: 20, snapMinDist: 10,
        topLeft: { x: -5000, y: 2500 },
        bottomRight: { x: 2500, y: -100 },
        touchManager: new TouchManager(),
    }
}


