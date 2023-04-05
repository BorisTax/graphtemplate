import { getPoint } from "./viewPortFunctions";
import { keyHandlers } from "../handlers/keyHandlers/options";
import { TKeyHandlerProps } from "../handlers/keyHandlers/KeyHandler";
import { AllAtomsProps } from "../customHooks/useAllAtoms";

export function pointerMove(e: PointerEvent, props: AllAtomsProps) {
    const { handler, viewPortData, setViewPortData  } = props
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.touchMove({ pointerId: e.pointerId, curPoint, ...props });
    else
        handler.move({button: 0,
            curPoint, ...props, 
            keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey }
        })
}
export function pointerDown(e: PointerEvent, props: AllAtomsProps) {
    const { handler } = props
    const curPoint = getPoint(e)
    e.preventDefault()
    if (e.pointerType === "touch")
        handler.touchDown({ pointerId: e.pointerId, curPoint: curPoint, ...props });
    else
        handler.down({ button: e.button, curPoint: curPoint, ...props, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
    //e.prPointerEventDefault();
}

export function pointerUp(e: PointerEvent, props: AllAtomsProps) {
    const { handler } = props
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.touchUp({ pointerId: e.pointerId, curPoint, ...props });
    else
        handler.up({ button: e.button, curPoint, ...props });
}

export function mouseWheel(e: WheelEvent, props: AllAtomsProps) {
    const { handler } = props
    const curPoint = getPoint(e)
    handler.wheel({ ...props, deltaY: e.deltaY, curPoint, ...props})
    e.preventDefault();
}
export function pointerLeave(e: PointerEvent, props: AllAtomsProps) {
    const{ handler } = props
    if (e.pointerType === "touch")
        handler.touchUp({ pointerId: e.pointerId, curPoint: getPoint(e), ...props });
    else
        handler.leave({ curPoint: getPoint(e), ...props});
}

export function pointerEnter(e: PointerEvent, props: AllAtomsProps) {
}

export function click(e: PointerEvent, props: AllAtomsProps) {
    const { handler } = props
    const curPoint = getPoint(e)
    e.preventDefault()
    handler.click({ button: e.button, curPoint, ...props, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
}

export function doubleClick(e: PointerEvent, props: AllAtomsProps) {
    const  { handler } = props
    const curPoint = getPoint(e)
    if (e.pointerType === "touch")
        handler.doubleClick({ button: 0, curPoint, ...props, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
    else
        handler.doubleClick({ button: e.button, curPoint, ...props, keys: { shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey } });
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
    const {handler} = props
    handler.cursor.setAdditional({ shiftKey: e.shiftKey, altKey: e.altKey });
    keyHandlers.forEach(key => {
        if (e.ctrlKey === key.ctrlKey && e.shiftKey === key.shiftKey && e.altKey === key.altKey && e.keyCode === key.keyCode) {
            const keyHandler = new key.handler()
            keyHandler.keyDown(e, { handler})
            e.preventDefault();
        }
    })
}