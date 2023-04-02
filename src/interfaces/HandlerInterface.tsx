import { Atom, WritableAtom } from "jotai";
import { ViewPortState } from "../atoms/viewportAtoms";
import Shape from "../components/shapes/Shape";
import { Point } from "../types/properties";
import { TKeys } from "../handlers/keyHandlers/options";
import { SetViewPortFunc } from "../components/ViewPortContainer";
import Cursor from "../components/shapes/cursors/Cursor";
export type THandlerProps = {
    button: number,
    curPoint: Point,
    viewPortData: ViewPortState,
    setViewPortData: SetViewPortFunc,
    getAtom: (a: Atom<any>) => any,
    setAtom: (a: WritableAtom<any, any, any>) => any,
    keys: TKeys,
    deltaY?: number
    pointerId?: number
}

export type TStatusBar = {text: string, icons: string[]}[]
export interface IHandler {
    clickCount : number;
    curShape : Shape | null;
    curPoint : Point
    prevPoint : Point
    statusBar : TStatusBar
    cursor: Cursor
    keypress: (code: string) => boolean
    click: (props: THandlerProps) => void
    doubleClick: (props: THandlerProps) => void
    isOutRect: (point: Point, viewPortData: ViewPortState) => boolean
    move: (props: THandlerProps) => void
    mouseOnScreen: (viewPortData: ViewPortState) => boolean
    down:(props: THandlerProps) => void
    up:(props: THandlerProps) => void
    leave: (props: THandlerProps) => void
    wheel:(props: THandlerProps) => void
    touchDown: (props: THandlerProps) => void
    touchMove: (props: THandlerProps) => void
    touchUp: (props: THandlerProps) => void
    }

export interface IHandlerDraggable extends IHandler {
    drag: boolean
    activeShape: Shape | null
}