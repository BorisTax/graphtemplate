import React, { useEffect } from "react";
import ViewPort from './ViewPort'
import { pointerMove, pointerDown, pointerUp, pointerLeave, pointerEnter, mouseWheel, click, doubleClick, keyDown, keyPress, keyUp } from "../functions/viewPortHandlers";
import { ViewPortState, setViewPortData, viewPortAtom } from "../atoms/viewportAtoms";
import { Atom, WritableAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { handlerAtom } from "../atoms/handlerAtoms";
import { MouseHandler } from "../handlers/MouseHandler";
import { getAtomFunc, setAtomFunc } from "../atoms/atoms";
import { shapeAtom } from "../atoms/shapeAtoms";

export type EventHandlers = {
    onPointerMove: (e: PointerEvent) => void,
    onPointerDown: (e: PointerEvent) => void,
    onPointerUp: (e: PointerEvent) => void,
    onMouseWheel: (e: WheelEvent) => void,
    onPointerLeave: (e: PointerEvent) => void,
    onPointerEnter: (e: PointerEvent) => void,
    onClick: (e: PointerEvent) => void,
    onDoubleClick: (e: PointerEvent) => void,
}

export type SetViewPortFunc = (callback: (data: ViewPortState) => ViewPortState) => void
export type PropsData = {
    viewPortData: ViewPortState,
    setViewPortData: SetViewPortFunc,
    handler: MouseHandler,
    getAtom: getAtomFunc,
    setAtom: setAtomFunc,
}

export default function ViewPortContainer() {
    const [viewPortData, setViewPortData] = useAtom(viewPortAtom)
    const handler = useAtomValue(handlerAtom)

    const getData = (): PropsData => ({
        viewPortData: useAtomValue(viewPortAtom),
        setViewPortData: (callback) => {
            const setData = useSetAtom(setViewPortData)
            const prevData: ViewPortState = useAtomValue(viewPortAtom)
            setData(callback(prevData))
        },
        handler: useAtomValue(handlerAtom),
        getAtom: (a: Atom<any>) => useAtomValue(a),
        setAtom: (a: WritableAtom<any, any, any>) => useSetAtom(a)
    })
    const data = {
        viewPortData, 
        setViewPortData,
        handler
    }
    useEffect(() => {
        window.addEventListener('keypress', (e: KeyboardEvent) => { keyPress(e, { handler: getData().handler, setAtom: getData().setAtom, getAtom: getData().getAtom  }) })
        window.addEventListener('keydown', (e: KeyboardEvent) => { keyDown(e, { handler: getData().handler, setAtom: getData().setAtom, getAtom: getData().getAtom }) })
        window.addEventListener('keyup', (e: KeyboardEvent) => { keyUp(e, {handler: getData().handler, setAtom: getData().setAtom, getAtom: getData().getAtom  }) })
    }, [])

    const eventHandlers: EventHandlers = {
        onPointerMove: (e: PointerEvent) => { pointerMove(e, {...getData()}) },
        onPointerDown: (e: PointerEvent) => { pointerDown(e, getData()) },
        onPointerUp: (e: PointerEvent) => { pointerUp(e, getData()) },
        onMouseWheel: (e: WheelEvent) => { mouseWheel(e, getData()) },
        onPointerLeave: (e: PointerEvent) => { pointerLeave(e, getData()) },
        onPointerEnter: (e: PointerEvent) => { pointerEnter(e, getData()) },
        onClick: (e: PointerEvent) => { click(e, getData()) },
        onDoubleClick: (e: PointerEvent) => { doubleClick(e, getData()) },
    }
    return <ViewPort
        {...getData()}
        eventHandlers={eventHandlers}
    />
}

