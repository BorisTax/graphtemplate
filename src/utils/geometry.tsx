export type Point = {
    x: number
    y: number
}

export class Vector {
    x: number
    y: number
    modulus: number
    constructor(p1: Point, p2: Point) {
        this.x = p2.x - p1.x;
        this.y = p2.y - p1.y;
        this.modulus = Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
export class Line {
    p1: Point
    p2: Point
    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
    }
    static byCoordinates(x1: number, x2: number, y1: number, y2: number) {
        return new Line({ x: x1, y: y1 }, { x: x2, y: y2 })
    }

}

export class SLine {
    a: number
    b: number
    c: number
    constructor(a: number, b: number, c: number) {
        this.a = a
        this.b = b
        this.c = c
    }
    static byTwoPoints(p1: Point, p2: Point) {
        return new SLine(p1.y - p2.y, p2.x - p1.x, p1.x * p2.y - p1.y * p2.x)
    }
    static byLine(l: Line) {
        const { p1, p2 } = l
        return new SLine(p1.y - p2.y, p2.x - p1.x, p1.x * p2.y - p1.y * p2.x)
    }

    getYbyX(x: number) {
        if (this.b !== 0) return -(this.a * x + this.c) / this.b; else return NaN;
    }
    getXbyY(y: number) {
        if (this.a !== 0) return -(this.b * y + this.c) / this.a; else return NaN;
    }
}

export class RLine {
    origin: Point
    vector: Vector
    directionPoint: Point
    baseSLine: SLine
    constructor(p1: Point, p2: Point) {
        this.origin = p1;
        this.vector = new Vector(p1, p2);
        this.directionPoint = { x: this.origin.x + this.vector.x, y: this.origin.y + this.vector.y }
        this.baseSLine = SLine.byTwoPoints(this.origin, this.directionPoint)
    }

    getYbyX(x: number) {
        const { a, b, c } = this.baseSLine
        if (b !== 0) {
            let y = -(a * x + c) / b;
            if (((x - this.origin.x) * this.vector.x) >= 0 && ((y - this.origin.y) * this.vector.y) >= 0) return y;
            return NaN;
        }
        else return NaN;
    }

    getXbyY(y: number) {
        const { a, b, c } = this.baseSLine
        if (a !== 0) {
            let x = -(b * y + c) / a;
            if (((x - this.origin.x) * this.vector.x) >= 0 && ((y - this.origin.y) * this.vector.y) >= 0) return y;
            return NaN;
        } else return NaN;
    }

}

export class Arc {
    first: Point
    second: Point
    third: Point
    center?: Point
    chord: number
    constructor(first: Point, second: Point, third: Point) {
        this.first = first;
        this.second = second;
        this.third = third;
        this.chord = Math.sqrt((second.x - first.x) * (second.x - first.x) + (second.y - first.y) * (second.y - first.y));
    }
}

export class Rectangle {
    topLeft: Point
    bottomRight: Point
    private _width: number
    private _height: number
    constructor(topLeft: Point, bottomRight: Point) {
        this.topLeft = { ...topLeft };
        this.bottomRight = { ...bottomRight };
        this.topLeft.x = topLeft.x > bottomRight.x ? bottomRight.x : topLeft.x;
        this.topLeft.y = topLeft.y < bottomRight.y ? bottomRight.y : topLeft.y;
        this._width = Math.abs(bottomRight.x - topLeft.x);
        this._height = Math.abs(bottomRight.y - topLeft.y);
        this.bottomRight.x = this.topLeft.x + this._width;
        this.bottomRight.y = this.topLeft.y - this._height;
    }
    get width(){
        return this._width
    }
    set width(w: number){
        this._width = w
        this.bottomRight.x = this.topLeft.x + w
    }
    get height(){
        return this._height
    }
    set height(h: number){
        this._height = h
        this.bottomRight.y = this.topLeft.y - h
    }
}

export class Circle {
    center: Point
    radius: number
    constructor(center: Point, radius: number) {
        this.center = center;
        this.radius = radius;
    }
}

export class Triangle {
    points: Point[]
    constructor(points: Point[]) {
        this.points = points;
    }
    getOuterCircle() {
        let line1 = Geometry.SLinePerpOnPoint(SLine.byTwoPoints(this.points[0], this.points[1]), Geometry.midPoint(this.points[0], this.points[1]));
        let line2 = Geometry.SLinePerpOnPoint(SLine.byTwoPoints(this.points[0], this.points[2]), Geometry.midPoint(this.points[0], this.points[2]));
        let p = Intersection.SLineSLine(line1, line2);
        if (p === null) p = Geometry.midPoint(this.points[0], this.points[1]);
        let circle = new Circle(p, Geometry.distance(p, this.points[0]));
        return circle;
    }
}

export class Intersection {
    static SLineSLine(line1: SLine, line2: SLine): Point | null {
        let d = line1.a * line2.b - line1.b * line2.a;
        if (d === 0) return null;
        let d1 = -line1.c * line2.b - (-line2.c * line1.b);
        let d2 = -line2.c * line1.a - (-line1.c * line2.a);
        return { x: d1 / d, y: d2 / d };
    }
    static LineSLine(line: Line, sline: SLine): Point | null {
        let p = Intersection.SLineSLine(sline, SLine.byLine(line));
        if (p === null) return null;
        if (!Geometry.pointOnLine(p, line.p1, line.p2)) return null;
        return p;
    }
    static RectangleSLine(rectTopLeft: Point, rectBottomRight: Point, line: SLine): Point[] {
        let lines = new Array(4);
        let points: Point[] = [];
        lines[0] = Line.byCoordinates(rectTopLeft.x, rectTopLeft.y, rectBottomRight.x, rectTopLeft.y);
        lines[1] = Line.byCoordinates(rectTopLeft.x, rectBottomRight.y, rectBottomRight.x, rectBottomRight.y);
        lines[2] = Line.byCoordinates(rectTopLeft.x, rectTopLeft.y, rectTopLeft.x, rectBottomRight.y);
        lines[3] = Line.byCoordinates(rectBottomRight.x, rectTopLeft.y, rectBottomRight.x, rectBottomRight.y);
        lines.forEach(l => {
            const p = Intersection.LineSLine(l, line)
            if (p && points.length < 2) points.push(p);
        });
        return points;
    }
    static RectangleRLine(rectTopLeft: Point, rectBottomRight: Point, line: RLine): Point[] | null {
        const ps = Intersection.RectangleSLine(rectTopLeft, rectBottomRight, SLine.byTwoPoints(line.origin, line.directionPoint));
        if (!ps) return null
        const points: Point[] = [];
        ps.forEach(p => { if (Geometry.isPointOnRayLine(line, p)) points.push(p) });
        return points;
    }
    static RectangleRectangle(rectTopLeft1: Point, rectBottomRight1: Point, rectTopLeft2: Point, rectBottomRight2: Point): Point[] {
        const lines1 = [Line.byCoordinates(rectTopLeft1.x, rectTopLeft1.y, rectBottomRight1.x, rectTopLeft1.y),
        Line.byCoordinates(rectBottomRight1.x, rectTopLeft1.y, rectBottomRight1.x, rectBottomRight1.y),
        Line.byCoordinates(rectTopLeft1.x, rectBottomRight1.y, rectBottomRight1.x, rectBottomRight1.y),
        Line.byCoordinates(rectTopLeft1.x, rectTopLeft1.y, rectTopLeft1.x, rectBottomRight1.y)];
        const lines2 = [Line.byCoordinates(rectTopLeft2.x, rectTopLeft2.y, rectBottomRight2.x, rectTopLeft2.y),
        Line.byCoordinates(rectBottomRight2.x, rectTopLeft2.y, rectBottomRight2.x, rectBottomRight2.y),
        Line.byCoordinates(rectTopLeft2.x, rectBottomRight2.y, rectBottomRight2.x, rectBottomRight2.y),
        Line.byCoordinates(rectTopLeft2.x, rectTopLeft2.y, rectTopLeft2.x, rectBottomRight2.y)];
        const ps: Point[] = [];
        lines1.forEach(l1 => {
            lines2.forEach((l2) => {
                const p = Intersection.LineLine(l1, l2);
                if (p) ps.push(p);
            })
        })
        return ps;
    }
    static LineRectangle(line: Line, rectTopLeft: Point, rectBottomRight: Point): Point[] | null {
        let lines = new Array(4);
        let points: Point[] = [];
        lines[0] = Line.byCoordinates(rectTopLeft.x, rectTopLeft.y, rectBottomRight.x, rectTopLeft.y);
        lines[1] = Line.byCoordinates(rectTopLeft.x, rectBottomRight.y, rectBottomRight.x, rectBottomRight.y);
        lines[2] = Line.byCoordinates(rectTopLeft.x, rectTopLeft.y, rectTopLeft.x, rectBottomRight.y);
        lines[3] = Line.byCoordinates(rectBottomRight.x, rectTopLeft.y, rectBottomRight.x, rectBottomRight.y);
        lines.forEach(l => {
            const p = Intersection.LineLine(line, l)
            if (p && points.length < 2) points.push(p);
        });
        return points;
    }
    static LineLine(l1: Line, l2: Line): Point | null {
        const p = Intersection.SLineSLine(SLine.byLine(l1), SLine.byLine(l2));
        if (p) {
            if (Geometry.pointOnLine(p, l1.p1, l1.p2) && Geometry.pointOnLine(p, l2.p1, l2.p2)) return p;
        }
        return null;
    }
    static CircleSLine(circle: Circle, line: SLine): Point[] | null {
        let dx = -circle.center.x;
        let dy = -circle.center.y;
        let sline = Geometry.LineShifted(line, dx, dy);
        let a = sline.a;
        let b = sline.b;
        let c = sline.c;
        let r = circle.radius;
        if (b === 0) {
            a = sline.b;
            b = sline.a;
        }
        let A = a * a + b * b;
        let B = 2 * a * c;
        let C = c * c - r * r * b * b;
        let x = Geometry.QuadEquation(A, B, C);
        if (x === null) return null;
        let res: Point[] = new Array(x.length);
        for (let i = 0; i < x.length; i++) {
            res[i] = { x: 0, y: 0 };
            if (sline.b === 0) {
                res[i].y = x[i];
                res[i].x = -(a * x[i] + c) / b;
            } else {
                res[i].x = x[i];
                res[i].y = -(a * x[i] + c) / b;
            }
            res[i].x = res[i].x - dx;
            res[i].y = res[i].y - dy;
        }
        return res;
    }
    static CircleRLine(circle: Circle, line: RLine): Point[] | null {
        let points = Intersection.CircleSLine(circle, SLine.byTwoPoints(line.origin, line.directionPoint));
        if (points === null) return null;
        for (let p of points) {
            if (!Geometry.isPointOnRayLine(line, p)) p = { x: NaN, y: NaN };
        }
        points = points.filter((p: Point) => !isNaN(p.x) && !isNaN(p.y))
        return points.length > 0 ? points : null;
    }
}

export default class Geometry {

    static realToScreenLength(value: number, realWidth: number, viewPortWidth: number): number {
        return Math.trunc(value / (realWidth / viewPortWidth));
    }
    static screenToRealLength(value: number, realWidth: number, viewPortWidth: number): number {
        return Math.trunc(value * (realWidth / viewPortWidth));
    }

    static SLinePerpOnPoint(line: SLine, p: Point) {
        return new SLine(-line.b, line.a, -line.a * p.y + line.b * p.x);
    }

    static LineShifted(line: SLine, dx: number, dy: number): SLine {
        let p: Point[] = new Array(2);
        for (let i = 0; i < 2; i++) {
            let x = i;
            let y = line.getYbyX(x);
            if (isNaN(y)) {
                y = i;
                x = line.getXbyY(y);
            }
            x = x + dx;
            y = y + dy;
            p[i] = { x, y };
        }
        return SLine.byTwoPoints(p[0], p[1]);
    }


    static pointInRect(p: Point, rectTopLeft: Point, rectBottomRight: Point, borders = true): boolean {
        let sx = (p.x - rectBottomRight.x) * (p.x - rectTopLeft.x);
        let sy = (p.y - rectBottomRight.y) * (p.y - rectTopLeft.y);
        let x = borders ? sx <= 0 : sx < 0
        let y = borders ? sy <= 0 : sy < 0
        return (x && y);
    }
    static pointInRectByPoints(x: number, y: number, x1: number, y1: number, x2: number, y2: number): boolean {
        if ((x >= x1 && x <= x2) && (y <= y1 && y >= y2)) return true;
        return false;
    }
    static linesIntersection(l1: Line, l2: Line): boolean {
        const p = Intersection.SLineSLine(SLine.byLine(l1), SLine.byLine(l2));
        if (!p) return false
        return (Geometry.pointOnLine(p, l1.p1, l1.p2, false) && Geometry.pointOnLine(p, l2.p1, l2.p2, false));
    }


    static isRectIntersects(rect1: Rectangle, rect2: Rectangle): boolean {
        const d = { p1: rect1.topLeft, p2: rect1.bottomRight }
        const l1 = { p1: rect2.topLeft, p2: { x: rect2.topLeft.x, y: rect2.bottomRight.y } }
        const l2 = { p1: rect2.topLeft, p2: { x: rect2.bottomRight.x, y: rect2.topLeft.y } }
        const l3 = { p1: rect2.bottomRight, p2: { x: rect2.topLeft.x, y: rect2.bottomRight.y } }
        const l4 = { p1: rect2.bottomRight, p2: { x: rect2.bottomRight.x, y: rect2.topLeft.y } }
        return [
            Geometry.linesIntersection(d, l1),
            Geometry.linesIntersection(d, l2),
            Geometry.linesIntersection(d, l3),
            Geometry.linesIntersection(d, l4),
        ].some(i => i);
    }

    static rectInRect(innerRect: Rectangle, outerRect: Rectangle): boolean {
        return [
            Geometry.pointInRect(innerRect.topLeft, outerRect.topLeft, outerRect.bottomRight, true),
            Geometry.pointInRect({ x: innerRect.topLeft.x, y: innerRect.bottomRight.y }, outerRect.topLeft, outerRect.bottomRight, true),
            Geometry.pointInRect({ x: innerRect.bottomRight.x, y: innerRect.topLeft.y }, outerRect.topLeft, outerRect.bottomRight, true),
            Geometry.pointInRect(innerRect.bottomRight, outerRect.topLeft, outerRect.bottomRight, true),
        ].every(p => p);
    }
    static rectToRectDist(rect1: Rectangle, rect2: Rectangle): number {
        const c1 = { x: (rect1.topLeft.x + rect1.bottomRight.x) / 2, y: (rect1.topLeft.y + rect1.bottomRight.y) / 2 }
        const c2 = { x: (rect2.topLeft.x + rect2.bottomRight.x) / 2, y: (rect2.topLeft.y + rect2.bottomRight.y) / 2 }
        return Geometry.distance(c1, c2)
    }

    static pointOnLine(p: Point, p1: Point, p2: Point, includeTips = true): boolean {
        if (!p || !p1 || !p2) return false;
        const sx = Math.round((p.x - p1.x) * (p.x - p2.x) * 100000) / 100000;
        const sy = Math.round((p.y - p1.y) * (p.y - p2.y) * 100000) / 100000;
        const res = includeTips ? (sx <= 0 && sy <= 0) : ((sx < 0 && sy <= 0) || (sx <= 0 && sy < 0))
        return res;
    }

    static pointOnSLineProjection(p: Point, line: SLine): Point {
        const p0 = Intersection.SLineSLine(line, Geometry.SLinePerpOnPoint(line, p));
        return p0 || { x: 0, y: 0 }
    }
    static PointToSLineDistance(p: Point, line: SLine): number {
        let res = Geometry.distance(p, Geometry.pointOnSLineProjection(p, line));
        return res;
    }

    static PointToRLineDistance(p: Point, line: RLine): number {
        let point = Geometry.pointOnSLineProjection(p, SLine.byTwoPoints(line.origin, line.directionPoint));
        let res;
        if (Geometry.isPointOnRayLine(line, point)) res = Geometry.distance(p, point); else res = Geometry.distance(p, line.origin);
        return res;
    }
    static PointToLineDistance(p: Point, line: Line): number {
        let point = Geometry.pointOnSLineProjection(p, SLine.byLine(line));
        let res;
        if (Geometry.pointOnLine(point, line.p1, line.p2)) res = Geometry.distance(p, point);
        else res = Math.min(Geometry.distance(p, line.p1), Geometry.distance(p, line.p2));
        return res;
    }

    static midPoint(p1: Point, p2: Point) {
        return { x: (p2.x + p1.x) / 2, y: (p2.y + p1.y) / 2 };
    }

    static scalar(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static angleVectors(v1: Vector, v2: Vector) {
        const sign = Math.sign(v1.x * v2.y - v2.x * v1.y)
        //return Math.atan((v1.x*v2.y - v1.y*v2.x) / (v1.x*v2.x + v1.y*v2.y))
        //return Math.atan2(v.y,v.x)
        return Math.acos(this.scalar(v1, v2) / (v1.modulus * v2.modulus)) * sign;
    }

    static arcCenterPoint(p1: Point, p2: Point, p3: Point) {
        let line1 = SLine.byTwoPoints(p1, p2);
        let line2 = SLine.byTwoPoints(p2, p3);
        let midp1 = Geometry.midPoint(p1, p2);
        let midp2 = Geometry.midPoint(p2, p3);
        let pline1 = Geometry.SLinePerpOnPoint(line1, midp1);
        let pline2 = Geometry.SLinePerpOnPoint(line2, midp2);
        return Intersection.SLineSLine(pline1, pline2);
    }

    static isPointOnRayLine(line: RLine, point: Point) {
        return (((point.x - line.origin.x) * line.vector.x) >= 0 && ((point.y - line.origin.y) * line.vector.y) >= 0);
    }



    static QuadEquation(a: number, b: number, c: number): number[] | null {
        if (a === 0) return null;
        let d = b * b - 4 * a * c;
        if (d < 0) return null;
        let res = [];
        if (d === 0) {
            res = [];
            res[0] = -b / (2 * a);
            return res;
        }
        res = [];
        res[0] = (-b + Math.sqrt(d)) / (2 * a);
        res[1] = (-b - Math.sqrt(d)) / (2 * a);
        return res;
    }

    static distance(p1: Point, p2: Point) {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }

    static rotatePoint(point: Point, angle: number, center: Point) {
        let p = { x: point.x - center.x, y: point.y - center.y };
        return {x: p.x * Math.cos(angle) - p.y * Math.sin(angle) + center.x, y: p.x * Math.sin(angle) + p.y * Math.cos(angle) + center.y};
    }
    static screenToReal(p: Point, viewPortWidth: number, viewPortHeight: number, topLeft: Point, bottomRight: Point) {
        let realWidth = bottomRight.x - topLeft.x;
        let realHeight = topLeft.y - bottomRight.y;
        let rx = p.x / viewPortWidth * realWidth + topLeft.x;
        let ry = topLeft.y - p.y / viewPortHeight * realHeight;
        return { x: rx, y: ry };
    }
    static realToScreen(point: Point, realRect: Rectangle, screenRect: Rectangle) {
        let ratio = realRect.width / screenRect.width;
        let x = Math.trunc((point.x - realRect.topLeft.x) / ratio);
        let y = -Math.trunc((point.y - realRect.topLeft.y) / ratio);
        return { x, y };
    }
}


