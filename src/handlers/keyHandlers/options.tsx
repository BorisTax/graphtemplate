import CancelKeyHandler from "./CancelKeyHandler";
import DeleteKeyHandler from "./DeleteKeyHandler";
import KeyHandler, { IKeyHandler } from "./KeyHandler";
export type TKeys = {
    ctrlKey: boolean,
    shiftKey: boolean,
    altKey: boolean,
    keyCode: number,
    handler: typeof KeyHandler
}
export const keyHandlers: TKeys[] = [
    { ctrlKey: false, shiftKey: false, altKey: false, keyCode: 46, handler: DeleteKeyHandler },
    { ctrlKey: false, shiftKey: false, altKey: false, keyCode: 27, handler: CancelKeyHandler },
]