import { getPoint } from "./viewPortFunctions";
import { keyHandlers } from "../handlers/keyHandlers/options";
import { PropsData } from "../components/ViewPortContainer";
import { TKeyHandlerProps } from "../handlers/keyHandlers/KeyHandler";

export function pointerMove(e: PointerEvent, props: PropsData) {
    const { handler, viewPortData, setViewPortData, setAtom, getAtom } = props
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.touchMove({ pointerId: e.pointerId, curPoint, viewPortData, setViewPortData, setAtom, getAtom });
    else
        handler.move({button: 0,
            curPoint, viewPortData, setViewPortData, setAtom, getAtom,
            keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey }
        })
}
export function pointerDown(e: PointerEvent, props: PropsData) {
    const { handler, viewPortData, setViewPortData, setAtom, getAtom } = props
    const curPoint = getPoint(e)
    e.preventDefault()
    if (e.pointerType === "touch")
        handler.touchDown({ pointerId: e.pointerId, curPoint: curPoint, viewPortData, setViewPortData, setAtom, getAtom });
    else
        handler.down({ button: e.button, curPoint: curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
    //e.prPointerEventDefault();
}

export function pointerUp(e: PointerEvent, props: PropsData) {
    const { handler, viewPortData, setViewPortData, setAtom, getAtom } = props
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.touchUp({ pointerId: e.pointerId, curPoint, viewPortData, setViewPortData, setAtom, getAtom });
    else
        handler.up({ button: e.button, curPoint, viewPortData, setViewPortData, setAtom, getAtom });
}

export function mouseWheel(e: WheelEvent, props: PropsData) {
    const { handler, viewPortData, setViewPortData, setAtom } = props
    const curPoint = getPoint(e)
    handler.wheel({ ...props, deltaY: e.deltaY, curPoint, viewPortData, setViewPortData, setAtom})
    e.preventDefault();
}
export function pointerLeave(e: PointerEvent, props: PropsData) {
    const{ handler, viewPortData, setViewPortData, setAtom, getAtom } = props
    if (e.pointerType === "touch")
        handler.touchUp({ pointerId: e.pointerId, curPoint: getPoint(e), viewPortData, setViewPortData, setAtom, getAtom });
    else
        handler.leave({ viewPortData, setViewPortData, setAtom, getAtom, curPoint: getPoint(e)});
}

export function pointerEnter(e: PointerEvent, props: PropsData) {
}

export function click(e: PointerEvent, props: PropsData) {
    const { handler, viewPortData, setViewPortData, setAtom, getAtom } = props
    const curPoint = getPoint(e)
    e.preventDefault()
    handler.click({ button: e.button, curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
}

export function doubleClick(e: PointerEvent, props: PropsData) {
    const  { handler, viewPortData, setViewPortData, setAtom, getAtom } = props
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.doubleClick({ button: 0, curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
    else
        handler.doubleClick({ button: e.button, curPoint, viewPortData, setViewPortData, setAtom, getAtom, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
}

export function keyPress(e: KeyboardEvent, props: TKeyHandlerProps) {
    const handler = props.handler
    if (handler.keypress(e.code))
        if (e.target === document.body) e.preventDefault();
};

export function keyUp(e: KeyboardEvent, props: TKeyHandlerProps) {
    const handler = props.handler
    handler.cursor.setAdditional({ shiftKey: e.shiftKey, altKey: e.altKey });
};

export function keyDown(e: KeyboardEvent, props: TKeyHandlerProps) {
    const {handler, setAtom, getAtom } = props
    handler.cursor.setAdditional({ shiftKey: e.shiftKey, altKey: e.altKey });
    keyHandlers.forEach(key => {
        if (e.ctrlKey === key.ctrlKey && e.shiftKey === key.shiftKey && e.altKey === key.altKey && e.keyCode === key.keyCode) {
            const keyHandler = new key.handler()
            keyHandler.keyDown(e, { handler, getAtom, setAtom })
            e.preventDefault();
        }
    })
}