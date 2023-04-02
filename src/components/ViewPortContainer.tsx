import React, { useEffect } from "react";
import ViewPort from './ViewPort'
import { pointerMove, pointerDown, pointerUp, pointerLeave, pointerEnter, mouseWheel, click, doubleClick, keyDown, keyPress, keyUp } from "../functions/viewPortHandlers";
import { ViewPortState, setViewPortData, viewPortAtom } from "../atoms/viewportAtoms";
import { Atom, WritableAtom, useAtomValue, useSetAtom } from "jotai";
import { handlerAtom } from "../atoms/handlerAtoms";
import { MouseHandler } from "../handlers/MouseHandler";
import { getAtomFunc, setAtomFunc } from "../atoms/atoms";

export type EventHandlers = {
    onPointerMove: (e: Event) => void,
    onPointerDown: (e: Event) => void,
    onPointerUp: (e: Event) => void,
    onMouseWheel: (e: Event) => void,
    onPointerLeave: (e: Event) => void,
    onPointerEnter: (e: Event) => void,
    onClick: (e: Event) => void,
    onDoubleClick: (e: Event) => void,
}

export type SetViewPortFunc = (callback: (data: ViewPortState) => ViewPortState) => void
export type Data = {
    viewPortData: ViewPortState,
    setViewPortData: SetViewPortFunc,
    handler: MouseHandler,
    getAtom: getAtomFunc,
    setAtom: setAtomFunc,
}

export default function ViewPortContainer() {
    const getData = (): Data => ({
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
    useEffect(() => {
        window.addEventListener('keypress', (e: Event) => { keyPress(e, { handler: getData().handler }) })
        window.addEventListener('keydown', (e: Event) => { keyDown(e, { handler: getData().handler, setAtom: getData().setAtom }) })
        window.addEventListener('keyup', (e: Event) => { keyUp(e, {handler: getData().handler }) })
    }, [])

    const eventHandlers: EventHandlers = {
        onPointerMove: (e: Event) => { pointerMove(e, {...getData()}) },
        onPointerDown: (e: Event) => { pointerDown(e, getData()) },
        onPointerUp: (e: Event) => { pointerUp(e, getData()) },
        onMouseWheel: (e: Event) => { mouseWheel(e, getData()) },
        onPointerLeave: (e: Event) => { pointerLeave(e, getData()) },
        onPointerEnter: (e: Event) => { pointerEnter(e, getData()) },
        onClick: (e: Event) => { click(e, getData()) },
        onDoubleClick: (e: Event) => { doubleClick(e, getData()) },
    }
    return <ViewPort
        {...getData()}
        eventHandlers={eventHandlers}
    />
}

