import { ViewPortState } from "../atoms/viewportAtoms";
import Shape from "../components/shapes/Shape";
import { Point } from "../types/properties";
import { TAddKeys } from "../handlers/keyHandlers/options";
import Cursor from "../components/shapes/cursors/Cursor";
import { AllAtomsProps, SetViewPortFunc } from "../customHooks/useAllAtoms";
export type TCommonProps = {
    curPoint: Point,
} & AllAtomsProps
export type TMouseProps = TCommonProps & {
    button?: number,
    keys?: TAddKeys
}
export type TTouchProps = TCommonProps & {
    pointerId: number
}
export type TWheelProps = TCommonProps & {
    deltaY?: number
}


export type TStatusBar = {text: string, icons: string[]}[]
export interface IHandler {
    clickCount : number;
    curShape : Shape | null;
    curPoint : Point
    screenPoint: Point
    prevPoint : Point
    statusBar : TStatusBar
    cursor: Cursor
    keypress: (code: string) => boolean
    click: (props: TMouseProps) => void
    doubleClick: (props: TMouseProps) => void
    isOutRect: (point: Point, viewPortData: ViewPortState) => boolean
    move: (props: TMouseProps) => void
    mouseOnScreen: (viewPortData: ViewPortState) => boolean
    down:(props: TMouseProps) => void
    up:(props: TMouseProps) => void
    leave: (props: TMouseProps) => void
    wheel:(props: TWheelProps) => void
    touchDown: (props: TTouchProps) => void
    touchMove: (props: TTouchProps) => void
    touchUp: (props: TTouchProps) => void
    }

export interface IHandlerDraggable extends IHandler {
    drag: boolean
    activeShape: Shape | null
}