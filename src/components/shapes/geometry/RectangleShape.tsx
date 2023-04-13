import { IShape } from '../../../interfaces/ShapeInterface';
import Property from '../../../types/Property';
import { Point, PropertyTypes, Rect, ScreenRect } from '../../../types/properties';
import Geometry, { Rectangle, Coord2D, Line, Intersection } from '../../../utils/geometry';
import Shape from "../Shape";

interface IRectangle extends IShape {
    screenRect: ScreenRect
}

export default class RectangleShape extends Shape implements IRectangle {
    screenRect: ScreenRect = { x: 0, y: 0, width: 0, height: 0 }
    constructor(model: Rect) {
        super();
        this.properties = new Map()
        const width = model.bottomRight.x - model.topLeft.x
        const height = model.topLeft.y - model.bottomRight.y
        this.properties.set("topLeft", new Property({ name: "topLeft", type: PropertyTypes.POINT, value: model.topLeft }))
        this.properties.set("bottomRight", new Property({ name: "bottomRight", type: PropertyTypes.POINT, value: model.bottomRight }))
        this.properties.set("width", new Property({
            name: "width",
            type: PropertyTypes.NUMBER,
            value: width,
            get: () => {
                const tl = this.properties.get("topLeft")
                const br = this.properties.get("bottomRight")
                return br.x - tl.x
            },
            set: (width) => {
                const tl = this.properties.get("topLeft")
                const br = this.properties.get("bottomRight")
                br.set({ x: tl.x + width, y: br.y })
            },
        }))
        this.properties.set("height", new Property({
            name: "height",
            type: PropertyTypes.NUMBER,
            value: height,
            get: () => {
                const tl = this.properties.get("topLeft")
                const br = this.properties.get("bottomRight")
                return tl.y - br.y
            },
            set: (height) => {
                const tl = this.properties.get("topLeft")
                const br = this.properties.get("bottomRight")
                br.set({ x: br.x, y: tl.y + height })
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
        const tl = Geometry.realToScreen(this.properties.get("topLeft"), realRect, screenRect);
        const br = Geometry.realToScreen(this.properties.get("bottomRight"), realRect, screenRect);
        this.screenRect.x = tl.x
        this.screenRect.y = tl.y
        this.screenRect.width = br.x - tl.x
        this.screenRect.height = br.y - tl.y
    }

    getDistance(point: Point) {
        const tl = this.properties.get("topLeft")
        const width = this.properties.get("width")
        const height = this.properties.get("height")
        let tr = new Coord2D(tl.x + width, tl.y);
        let bl = new Coord2D(tl.x, tl.y - height);
        let br = new Coord2D(tl.x + width, tl.y - height);
        let top = new Line(tl, tr);
        let bottom = new Line(bl, br);
        let right = new Line(tr, br);
        let left = new Line(tl, bl);
        return Math.min(Geometry.PointToLineDistance(point, top),
            Geometry.PointToLineDistance(point, left),
            Geometry.PointToLineDistance(point, bottom),
            Geometry.PointToLineDistance(point, right));
    }
    
    isInSelectionRect({topLeft, bottomRight}: Rect): {cross: boolean, full: boolean} {
        const tl = this.properties.get("topLeft")
        const br = this.properties.get("bottomRight")
        const inRect = [Geometry.pointInRect(tl, topLeft, bottomRight),
        Geometry.pointInRect(br, topLeft, bottomRight)];
        const full = inRect.every(i => i === true);
        const cross = Intersection.RectangleRectangle(topLeft, bottomRight, tl, br).length > 0;
        return { cross, full };
    }

}