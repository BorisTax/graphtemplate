import { Actions } from "../../atoms/actions";
import { AllAtomsProps } from "../../customHooks/useAllAtoms";
import KeyHandler from "./KeyHandler";

export default class CancelKeyHandler extends KeyHandler {
    keyPress(e: KeyboardEvent, props: AllAtomsProps) {
        super.keyPress(e, props)
    };

    keyUp(e: KeyboardEvent, props: AllAtomsProps) {
        super.keyUp(e, props)
    };

    keyDown(e: KeyboardEvent, props: AllAtomsProps) {
        const {setHandler} = props
        setHandler(Actions.cancel())
    }
}
