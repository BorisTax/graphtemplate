import { MouseHandler } from "../MouseHandler";
import { SetAtomFunc } from "../../atoms/atoms";
import { AllAtomsProps } from "../../customHooks/useAllAtoms";

export type TKeyHandlerProps = {
    handler: MouseHandler,
    setHandler: SetAtomFunc,
    setDialog: SetAtomFunc
}

export interface IKeyHandler {
    keyPress: (e: KeyboardEvent, props: AllAtomsProps) => void
    keyUp: (e: KeyboardEvent, props: AllAtomsProps) => void
    keyDown: (e: KeyboardEvent, props: AllAtomsProps) => void
}

export default class KeyHandler implements IKeyHandler {

    keyPress(e: KeyboardEvent, props: AllAtomsProps) {
        const {handler} = props
        if (handler.keypress(e.code))
            if (e.target === document.body) e.preventDefault();
    };

    keyUp(e: KeyboardEvent, props: AllAtomsProps) {

    };

    keyDown(e: KeyboardEvent, props: AllAtomsProps) {
    }
}

