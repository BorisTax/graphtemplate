import { getPoint } from "./viewPortFunctions";
import { keyHandlers } from "../keyHandlers/options";

export function pointerMove(e, { handler, viewPortData, setViewPortData, setAtom, getAtom }) {
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.touchMove({ pointerId: e.pointerId, curPoint, viewPortData, setViewPortData, setAtom, getAtom });
    else
        handler.move({
            curPoint, viewPortData, setViewPortData, setAtom, getAtom,
            keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey }
        })
}
export function pointerDown(e, { handler, viewPortData, setViewPortData, setAtom, getAtom }) {
    const curPoint = getPoint(e)
    e.preventDefault()
    if (e.pointerType === "touch")
        handler.touchDown({ pointerId: e.pointerId, curPoint: curPoint, viewPortData, setViewPortData, setAtom, getAtom });
    else
        handler.down({ button: e.button, curPoint: curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
    //e.preventDefault();
}

export function pointerUp(e, { handler, viewPortData, setViewPortData, setAtom, getAtom }) {
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.touchUp({ pointerId: e.pointerId, curPoint, viewPortData, setViewPortData, setAtom, getAtom });
    else
        handler.up({ button: e.button, curPoint, viewPortData, setViewPortData, setAtom, getAtom });
}

export function mouseWheel(e, { handler, viewPortData, setViewPortData, setAtom }) {
    const curPoint = getPoint(e)
    handler.wheel({ deltaY: e.deltaY, curPoint, viewPortData, setViewPortData, setAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } })
    e.preventDefault();
}
export function pointerLeave(e, { handler, viewPortData, setViewPortData, setAtom, getAtom }) {
    if (e.pointerType === "touch")
        handler.touchUp({ pointerId: e.pointerId, viewPortData, setViewPortData, setAtom, getAtom });
    else
        handler.leave({ viewPortData, setAtom });
}

export function pointerEnter(e, { handler, viewPortData, setViewPortData, setAtom }) {
}

export function click(e, { handler, viewPortData, setViewPortData, setAtom }) {
    const curPoint = getPoint(e)
    e.preventDefault()
    handler.click({ button: e.button, curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
}

export function doubleClick(e, { handler, viewPortData, setViewPortData, setAtom }) {
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.doubleClick({ button: 0, curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
    else
        handler.doubleClick({ button: e.button, curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
}

export function keyPress(e, { handler }) {
    if (handler.keypress(e.code))
        if (e.target === document.body) e.preventDefault();
};

export function keyUp(e, { handler }) {
    handler.cursor.setAdditional({ shiftKey: e.shiftKey, altKey: e.altKey });
};

export function keyDown(e, {handler, setAtom }) {
    if (window.KEYDOWNHANDLE === false) return;
    handler.cursor.setAdditional({ shiftKey: e.shiftKey, altKey: e.altKey });
    keyHandlers.forEach(key => {
        if (e.ctrlKey === key.ctrlKey && e.shiftKey === key.shiftKey && e.altKey === key.altKey && e.keyCode === key.keyCode) {
            const keyHandler = new key.handler()
            keyHandler.keyDown(e, { getAtom, setAtom })
            e.preventDefault();
        }
    })
}