import { deleteConfirm } from "../../atoms/dialogAtoms";
import KeyHandler, { TKeyHandlerProps } from "./KeyHandler";

export default class DeleteKeyHandler extends KeyHandler {
    keyPress(e: KeyboardEvent, props: TKeyHandlerProps) {
        const { handler } = props
        super.keyPress(e, props)
    };

    keyUp(e: KeyboardEvent, props: TKeyHandlerProps) {
        super.keyUp(e, props)
    };

    keyDown(e: KeyboardEvent, props: TKeyHandlerProps) {
        const {getAtom, setAtom} = props
        deleteConfirm(getAtom, setAtom)
    }
}