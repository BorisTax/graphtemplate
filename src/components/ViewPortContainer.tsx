import React, { useEffect } from "react";
import ViewPort from './ViewPort'
import { pointerMove, pointerDown, pointerUp, pointerLeave, pointerEnter, mouseWheel, click, doubleClick, keyDown, keyPress, keyUp } from "../functions/viewPortHandlers";
import useAllAtoms from "../customHooks/useAllAtoms";

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

export default function ViewPortContainer() {
    const data = useAllAtoms()
    useEffect(() => {
        window.addEventListener('keypress', (e: KeyboardEvent) => { keyPress(e, { handler: data.handler}) })
        window.addEventListener('keydown', (e: KeyboardEvent) => { keyDown(e, { handler: data.handler}) })
        window.addEventListener('keyup', (e: KeyboardEvent) => { keyUp(e, {handler: data.handler}) })
    }, [])
    const eventHandlers: EventHandlers = {
        onPointerMove: (e: PointerEvent) => { pointerMove(e, data) },
        onPointerDown: (e: PointerEvent) => { pointerDown(e, data) },
        onPointerUp: (e: PointerEvent) => { pointerUp(e, data) },
        onMouseWheel: (e: WheelEvent) => { mouseWheel(e, data) },
        onPointerLeave: (e: PointerEvent) => { pointerLeave(e, data) },
        onPointerEnter: (e: PointerEvent) => { pointerEnter(e, data) },
        onClick: (e: PointerEvent) => { click(e, data) },
        onDoubleClick: (e: PointerEvent) => { doubleClick(e, data) },
    }
    return <ViewPort
        {...data}
        eventHandlers={eventHandlers}
    />
}

