import { atom } from 'jotai'
import TouchManager from "../handlers/TouchManager";
import Grid from '../components/shapes/Grid';
import Shape from '../components/shapes/Shape';
import { Rectangle } from '../utils/geometry';
import { getRealRect, getScreenRect } from '../functions/viewPortFunctions';

export type ViewPortState = {
    curRealPoint: { x: number, y: number },
    curViewportPoint: { x: number, y: number },
    grid: Shape,
    gridStep: number, gridStepPixels: number,
    marginTop: number, marginLeft: number, marginBottom: number, marginRight: number,
    maxPanWidth: number, maxPanHeight: number,
    ratio: number, pixelRatio: number,
    selectDist: number, snapDist: number, snapMinDist: number,
    realRect: Rectangle,
    screenRect: Rectangle,
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
        grid: new Grid(),
        gridStep: 10,
        gridStepPixels: 1,
        marginTop: 0, marginLeft: 0, marginBottom: 0, marginRight: 0,
        maxPanWidth: 3000, maxPanHeight: 3000,
        ratio: 1, pixelRatio: 1,
        selectDist: 2,
        snapDist: 20, snapMinDist: 10,
        realRect: getRealRect({ x: -5000, y: 2500 },
            { x: 2500, y: -100 })
        ,
        screenRect: getScreenRect(550, 400),
        touchManager: new TouchManager(),
    }
}


