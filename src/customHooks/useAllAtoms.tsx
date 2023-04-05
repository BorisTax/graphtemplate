import { useAtom, useAtomValue } from "jotai"
import { handlerAtom } from "../atoms/handlerAtoms"
import { shapeAtom } from "../atoms/shapeAtoms"
import { viewPortAtom } from "../atoms/viewportAtoms"

export default function useAllAtoms(){
    const [viewPortData, setViewPortData] = useAtom(viewPortAtom)
    const [shapes, setShapes] = useAtom(shapeAtom)
    const handler = useAtomValue(handlerAtom)
    return {viewPortData, shapes, handler, setViewPortData, setShapes}
}