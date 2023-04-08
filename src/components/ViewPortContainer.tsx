import React, { useEffect, useRef } from "react";
import ViewPort from './ViewPort'
import { pointerMove, pointerDown, pointerUp, pointerLeave, pointerEnter, mouseWheel, click, doubleClick, keyDown, keyPress, keyUp } from "../functions/viewPortHandlers";
import useAllAtoms, { AllAtomsProps } from "../customHooks/useAllAtoms";
import { ViewPortState } from "../atoms/viewportAtoms";

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
    const atoms = useAllAtoms()
    const data = useRef<AllAtomsProps>(atoms)
    const viewPortData = useRef<ViewPortState>(atoms.viewPortData)
    viewPortData.current = atoms.viewPortData
    data.current = atoms
    useEffect(() => {
        window.addEventListener('keypress', (e: KeyboardEvent) => { keyPress(e, {...data.current, viewPortData: viewPortData.current}) })
        window.addEventListener('keydown', (e: KeyboardEvent) => { keyDown(e, {...data.current, viewPortData: viewPortData.current}) })
        window.addEventListener('keyup', (e: KeyboardEvent) => { keyUp(e, {...data.current, viewPortData: viewPortData.current}) })
    }, 
    // eslint-disable-next-line
    [])
    const eventHandlers: EventHandlers = {
        onPointerMove: (e: PointerEvent) => { pointerMove(e, {...data.current, viewPortData: viewPortData.current}) },
        onPointerDown: (e: PointerEvent) => { pointerDown(e, {...data.current, viewPortData: viewPortData.current}) },
        onPointerUp: (e: PointerEvent) => { pointerUp(e, {...data.current, viewPortData: viewPortData.current}) },
        onMouseWheel: (e: WheelEvent) => { mouseWheel(e, {...data.current, viewPortData: viewPortData.current}) },
        onPointerLeave: (e: PointerEvent) => { pointerLeave(e, {...data.current, viewPortData: viewPortData.current}) },
        onPointerEnter: (e: PointerEvent) => { pointerEnter(e, {...data.current, viewPortData: viewPortData.current}) },
        onClick: (e: PointerEvent) => { click(e, {...data.current, viewPortData: viewPortData.current}) },
        onDoubleClick: (e: PointerEvent) => { doubleClick(e, {...data.current, viewPortData: viewPortData.current}) },
    }
    return <ViewPort
        {...data.current}
        eventHandlers={eventHandlers}
    />
}

