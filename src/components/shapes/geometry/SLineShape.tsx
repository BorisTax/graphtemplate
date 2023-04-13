import Geometry, { Intersection, SLine } from "../../../utils/geometry";
import Shape from "../Shape";
export default class SLineShape extends Shape {
    constructor(line) {
        super();
        this.model = line;
        this.properties = [

        ];
    }
    draw(ctx, realRect, screenRect) {
        super.draw(ctx, realRect, screenRect)
        if (this.p0 === null || this.p1 === null) return;
        ctx.beginPath();
        ctx.moveTo(this.p0.x + 0.5, this.p0.y + 0.5);
        ctx.lineTo(this.p1.x + 0.5, this.p1.y + 0.5);
        ctx.stroke();
    }
    refresh(realRect, screenRect) {
        let center = { x: realRect.topLeft.x + realRect.width / 2, y: realRect.topLeft.y - realRect.height / 2 };
        let radius = Geometry.distance(realRect.topLeft, center);
        let p = Intersection.CircleSLine({ center, radius }, this.model);
        if (p !== null) {
            if (p.length === 1) {
                let r = this.p[0];
                p = new Array(2);
                p[0] = r;
                p[1] = p[0];
            }
            this.p0 = Geometry.realToScreen(p[0], realRect, screenRect);
            this.p1 = Geometry.realToScreen(p[1], realRect, screenRect);
        } else {
            this.p0 = null;
            this.p1 = null;
        }
    }

    refreshModel() {
        if (this.properties[1].changed || this.properties[2].changed || this.properties[3].changed) {
            this.model.a = this.properties[1].value;
            this.model.b = this.properties[2].value;
            this.model.c = this.properties[3].value;

        }
        if (this.properties[4].changed || this.properties[5].changed) {
            const line = { p1: this.properties[4].value, p2: this.properties[5].value }
            this.model = new SLine(line);
            this.model.p1 = line.p1;
            this.model.p2 = line.p2;

        }
        super.refreshModel();

    }

    isInRect(topLeft, bottomRight) {
        const full = false;
        const cross = Intersection.RectangleSLine(topLeft, bottomRight, this.model).length > 0;
        return { cross, full };
    }

}