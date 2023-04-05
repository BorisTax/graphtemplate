import { Atom, WritableAtom } from "jotai";
import { MouseHandler } from "../MouseHandler";

export type TKeyHandlerProps = {
    handler: MouseHandler,
}

export interface IKeyHandler {
    keyPress: (e: KeyboardEvent, props: TKeyHandlerProps) => void
    keyUp: (e: KeyboardEvent, props: TKeyHandlerProps) => void
    keyDown: (e: KeyboardEvent, props: TKeyHandlerProps) => void
}

export default class KeyHandler implements IKeyHandler {

    keyPress(e: KeyboardEvent, props: TKeyHandlerProps) {
        const {handler} = props
        if (handler.keypress(e.code))
            if (e.target === document.body) e.preventDefault();
    };

    keyUp(e: KeyboardEvent, props: TKeyHandlerProps) {

    };

    keyDown(e: KeyboardEvent, props: TKeyHandlerProps) {
    }
}

