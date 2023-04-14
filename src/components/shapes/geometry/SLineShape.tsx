import Property, { Point, PropertyTypes, Rect } from "../../../types/properties";
import Geometry, { Intersection, SLine } from "../../../utils/geometry";
import Shape from "../Shape";
export default class SLineShape extends Shape {
    model: SLine
    private p0: Point|null = null
    private p1: Point|null = null
    constructor(line: SLine) {
        super();
        this.model = line;
        this.properties.set("a", new Property({ name: "a", type: PropertyTypes.NUMBER, value: line.a, set: (v: number) => { this.model.a = v }}))
        this.properties.set("b", new Property({ name: "b", type: PropertyTypes.NUMBER, value: line.b, set: (v: number) => { this.model.b = v }}))
        this.properties.set("c", new Property({ name: "c", type: PropertyTypes.NUMBER, value: line.c, set: (v: number) => { this.model.c = v }}))
    }
    draw(ctx: CanvasRenderingContext2D, realRect: Rect, screenRect: Rect) {
        super.draw(ctx, realRect, screenRect)
        if (this.p0 === null || this.p1 === null) return;
        ctx.beginPath();
        ctx.moveTo(this.p0.x + 0.5, this.p0.y + 0.5);
        ctx.lineTo(this.p1.x + 0.5, this.p1.y + 0.5);
        ctx.stroke();
    }
    refresh(realRect: Rect, screenRect: Rect) {
        let center = { x: realRect.topLeft.x + realRect.width / 2, y: realRect.topLeft.y - realRect.height / 2 };
        let radius = Geometry.distance(realRect.topLeft, center);
        let p = Intersection.CircleSLine({ center, radius }, this.model);
        if (p !== null) {
            if (p.length === 1) {
                p.push(p[0])
            }
            this.p0 = Geometry.realToScreen(p[0], realRect, screenRect);
            this.p1 = Geometry.realToScreen(p[1], realRect, screenRect);
        } else {
            this.p0 = null;
            this.p1 = null;
        }
    }

    isInRect(topLeft: Point, bottomRight: Point) {
        const full = false;
        const cross = Intersection.RectangleSLine(topLeft, bottomRight, this.model).length > 0;
        return { cross, full };
    }

}