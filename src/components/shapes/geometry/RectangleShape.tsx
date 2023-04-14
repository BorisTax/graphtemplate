import { IShape } from '../../../interfaces/ShapeInterface';
import Property, { Point, PropertyTypes, Rect, ScreenRect, TProperties } from '../../../types/properties';
import Geometry, { Rectangle, Line, Intersection } from '../../../utils/geometry';
import Shape from "../Shape";

interface IRectangle extends IShape {
    screenRect: ScreenRect
}

export default class RectangleShape extends Shape implements IRectangle {
    screenRect: ScreenRect = { x: 0, y: 0, width: 0, height: 0 }
    constructor(model: Rectangle) {
        super();
        this.properties = new Map<string, TProperties>()
        const width = model.br.x - model.tl.x
        const height = model.tl.y - model.br.y
        this.properties.set("topLeft", new Property<Point>({ name: "topLeft", type: PropertyTypes.POINT, value: model.tl }))
        this.properties.set("bottomRight", new Property<Point>({ name: "bottomRight", type: PropertyTypes.POINT, value: model.br }))
        this.properties.set("width", new Property<number>({
            name: "width",
            type: PropertyTypes.NUMBER,
            value: width,
            get: () => {
                const tl: Point = this.properties.get("topLeft")?.value as Point
                const br: Point = this.properties.get("bottomRight")?.value as Point
                return br.x - tl.x
            },
            set: (width) => {
                const tl: Point = this.properties.get("topLeft")?.value as Point
                const br = this.properties.get("bottomRight") as Property<Point>
                if(br) br.set({ x: tl.x + width, y: br.value.y })
            },
        }))
        this.properties.set("height", new Property({
            name: "height",
            type: PropertyTypes.NUMBER,
            value: height,
            get: () => {
                const tl: Point = this.properties.get("topLeft")?.value as Point
                const br: Point = this.properties.get("bottomRight")?.value as Point
                return tl.y - br.y
            },
            set: (height) => {
                const tl: Point = this.properties.get("topLeft")?.value as Point
                const br = this.properties.get("bottomRight") as Property<Point>
                br.set({ x: br.value.x, y: tl.y + height })
            },
        }))
    }

    draw(ctx: CanvasRenderingContext2D, realRect: Rect, screenRect: Rect, fill = false) {
        super.draw(ctx, realRect, screenRect)
        const width = this.properties.get("width")
        if (fill) {
            ctx.fillRect(this.screenRect.x, this.screenRect.y, this.screenRect.width, this.screenRect.height);
        }
        ctx.strokeRect(this.screenRect.x, this.screenRect.y, this.screenRect.width, this.screenRect.height);
    }
    refresh(realRect: Rect, screenRect: Rect) {
        const tl: Point = this.properties.get("topLeft")?.value as Point
        const br: Point = this.properties.get("bottomRight")?.value as Point
        const tl0 = Geometry.realToScreen(tl, realRect, screenRect);
        const br0 = Geometry.realToScreen(br, realRect, screenRect);
        this.screenRect.x = tl0.x
        this.screenRect.y = tl0.y
        this.screenRect.width = br0.x - tl0.x
        this.screenRect.height = br0.y - tl0.y
    }
    
    isInSelectionRect({topLeft, bottomRight}: Rect): {cross: boolean, full: boolean} {
        const tl: Point = this.properties.get("topLeft")?.value as Point
        const br: Point = this.properties.get("bottomRight")?.value as Point
        const inRect = [Geometry.pointInRect(tl, topLeft, bottomRight),
        Geometry.pointInRect(br, topLeft, bottomRight)];
        const full = inRect.every(i => i === true);
        const cross = Intersection.RectangleRectangle(topLeft, bottomRight, tl, br).length > 0;
        return { cross, full };
    }

}