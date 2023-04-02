import { cancelAtom } from "../../atoms/actionAtoms";
import KeyHandler, { TKeyHandlerProps } from "./KeyHandler";

export default class CancelKeyHandler extends KeyHandler {
    keyPress(e: KeyboardEvent, props: TKeyHandlerProps) {
        const { handler } = props
        super.keyPress(e, props)
    };

    keyUp(e: KeyboardEvent, props: TKeyHandlerProps) {
        super.keyUp(e, props)
    };

    keyDown(e: KeyboardEvent, props: TKeyHandlerProps) {
        const {setAtom} = props
        setAtom(cancelAtom)()
    }
}
