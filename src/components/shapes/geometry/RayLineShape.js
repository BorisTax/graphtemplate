import Geometry,{Coord2D,Circle, Intersection} from "../../utils/geometry";
import EndSnapMarker from './markers/EndSnapMarker';
import Shape from "./Shape";
import PointMarker from "./markers/PointMarker";
import PointPicker from "./pickers/PointPicker";
import {PropertyTypes} from "./PropertyData";
export default class RayLineShape extends Shape{
    constructor(line){
        super();
        this.model={...line,vector:{x:line.directionPoint.x-line.origin.x,y:line.directionPoint.y-line.origin.y}};
        this.properties=[
            {type:PropertyTypes.STRING,labelKey:"name"},
            {type:PropertyTypes.VERTEX,value:line.origin,labelKey:"origin",picker:PointPicker},
            {type:PropertyTypes.VERTEX,value:line.directionPoint,labelKey:"direction",picker:PointPicker},
        ]
    this.defineProperties();
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        if(this.p0===null||this.p1===null) return;
        ctx.beginPath();
        ctx.moveTo(this.p0.x+0.5,this.p0.y+0.5);
        ctx.lineTo(this.p1.x+0.5,this.p1.y+0.5);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        let br=new Coord2D(realRect.topLeft.x+realRect.width,realRect.topLeft.y-realRect.height);
        let c=Geometry.midPoint(realRect.topLeft,br);
        let rad=Geometry.distance(realRect.topLeft,br)/2;
        let circle=new Circle(c,rad);
        this.model.vector.x=this.model.directionPoint.x-this.model.origin.x;
        this.model.vector.y=this.model.directionPoint.y-this.model.origin.y;
        let p=Intersection.CircleRLine(circle,this.model);
        if(p!=null){
            if(p.length===1){
                let r=p[0];
                p=new Array(2);
                p[0]=this.model.origin;
                p[1]=r;
            }
            this.p0=Geometry.realToScreen(p[0],realRect,screenRect);
            this.p1=Geometry.realToScreen(p[1],realRect,screenRect);
        }else{
            this.p0=null;
            this.p1=null;
        }
        // if(this.activePoint) 
        //     this.activePointMarker=new PointMarker(this.activePoint)
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.model.origin));
        return list;
    }


    refreshModel(){
        this.model.origin=this.properties[1].value;
        this.model.directionPoint=this.properties[2].value;
        this.model.vector.x=this.model.directionPoint.x-this.model.origin.x;
        this.model.vector.y=this.model.directionPoint.y-this.model.origin.y;
     }
    getDistance(point) {
        return Geometry.PointToRLineDistance(point,this.model);
    }
    isInRect(topLeft,bottomRight){
        const full=false;
        const cross=Intersection.RectangleRLine(topLeft,bottomRight,this.model).length>0;
        return {cross,full};    
    }
    toString(){
        return `Ray origin (${this.model.origin.x},${this.model.origin.y}) vector(${this.model.vector.x},${this.model.vector.y})`;
    }
    getDescription(){
        return 'RLine';
    }

}