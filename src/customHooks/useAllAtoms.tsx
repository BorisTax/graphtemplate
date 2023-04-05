import { useAtom, useAtomValue, useSetAtom} from "jotai"
import { handlerAtom, setHandlerAtom } from "../atoms/handlerAtoms"
import { ShapeAtomState, shapeAtom, setShapeAtom } from "../atoms/shapeAtoms"
import { ViewPortState, viewPortAtom } from "../atoms/viewportAtoms"
import { MouseHandler } from "../handlers/MouseHandler"
import { SetAtomFunc } from "../atoms/atoms"

export type SetViewPortFunc = (state: ViewPortState) => void
export type AllAtomsProps = {
    viewPortData: ViewPortState,
    setViewPortData: SetViewPortFunc,
    handler: MouseHandler,
    setHandler: SetAtomFunc,
    shapeState: ShapeAtomState,
    setShapeState: SetAtomFunc
}

export default function useAllAtoms(): AllAtomsProps {
    const [viewPortData, setViewPortData] = useAtom(viewPortAtom)
    const shapeState = useAtomValue(shapeAtom)
    const setShapeState = useSetAtom(setShapeAtom)
    const handler = useAtomValue(handlerAtom)
    const setHandler = useSetAtom(setHandlerAtom)
    return {viewPortData, shapeState, handler, setViewPortData, setShapeState, setHandler}
}