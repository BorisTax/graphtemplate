import {Coord2D} from "../../utils/geometry";
import Geometry from "../../utils/geometry";
import CenterSnapMarker from './markers/CenterSnapMarker';
import Shape from "./Shape";
import {PropertyTypes} from "./PropertyData";
import PointPicker from './pickers/PointPicker'
import DistancePicker from './pickers/DistancePicker'
import ShapeStyle from "./ShapeStyle";
export default class CircleShape extends Shape{
    constructor(circle){
        super();
        this.p=new Coord2D();
        this.model=circle;
        this.setStyle(new ShapeStyle())
        this.properties=[
            {type:PropertyTypes.STRING,labelKey:"name"},
            {type:PropertyTypes.VERTEX,value:circle.center,labelKey:"center",picker:PointPicker},
            {type:PropertyTypes.POSITIVE_NUMBER,value:circle.radius,labelKey:"radius",picker:DistancePicker},
        ]
        this.defineProperties();
    }

    drawSelf(ctx, realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.beginPath();
        ctx.arc(this.screenCenter.x+0.5,this.screenCenter.y+0.5,this.screenRadius,0,2*Math.PI);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.screenCenter=Geometry.realToScreen(this.model.center,realRect,screenRect);
        this.screenRadius=Geometry.realToScreenLength(this.model.radius,realRect.width,screenRect.width);

    }

    getMarkers(){
        let list=[];
        list.push(new CenterSnapMarker(this.model.center));
        return list;
    }

    refreshModel(){
        this.model.center=this.properties[1].value;
        this.model.radius=this.properties[2].value;
    }

    getDistance(point) {
        return Math.abs(Geometry.distance(point,this.model.center)-this.model.radius);
    }
    isInRect(topLeft,bottomRight){
        const outRectX1=topLeft.x-this.model.radius;
        const outRectY1=topLeft.y+this.model.radius;
        const outRectX2=bottomRight.x+this.model.radius;
        const outRectY2=bottomRight.y-this.model.radius;
        const inRectX1=topLeft.x+this.model.radius;
        const inRectY1=topLeft.y-this.model.radius;
        const inRectX2=bottomRight.x-this.model.radius;
        const inRectY2=bottomRight.y+this.model.radius;
        const c=this.model.center;
        let cross=false;
        const signs=[Math.sign(Geometry.distance(c,{x:topLeft.x,y:topLeft.y})-this.model.radius),
                     Math.sign(Geometry.distance(c,{x:bottomRight.x,y:topLeft.y})-this.model.radius),
                     Math.sign(Geometry.distance(c,{x:bottomRight.x,y:bottomRight.y})-this.model.radius),
                     Math.sign(Geometry.distance(c,{x:topLeft.x,y:bottomRight.y})-this.model.radius)];
        if(signs.every(x=>x<0)) return {cross:false,full:false};
        let full=Geometry.pointInRectByPoints(c.x,c.y,inRectX1,inRectY1,inRectX2,inRectY2);
        if(full===true) return {cross:false,full:true}
        if(Geometry.pointInRectByPoints(c.x,c.y,outRectX1,outRectY1,outRectX2,outRectY2)){
                cross=true;
                if(Geometry.pointInRectByPoints(c.x,c.y,outRectX1,outRectY1,topLeft.x,topLeft.y)){
                    if(Geometry.distance(c,{x:topLeft.x,y:topLeft.y})>this.model.radius) cross=false;
                }
                if(Geometry.pointInRectByPoints(c.x,c.y,bottomRight.x,outRectY1,outRectX2,topLeft.y)){
                    if(Geometry.distance(c,{x:bottomRight.x,y:topLeft.y})>this.model.radius) cross=false;
                }
                if(Geometry.pointInRectByPoints(c.x,c.y,bottomRight.x,bottomRight.y,outRectX2,outRectY2)){
                    if(Geometry.distance(c,{x:bottomRight.x,y:bottomRight.y})>this.model.radius) cross=false;
                }
                if(Geometry.pointInRectByPoints(c.x,c.y,outRectX1,bottomRight.y,topLeft.x,outRectY2)){
                    if(Geometry.distance(c,{x:topLeft.x,y:bottomRight.y})>this.model.radius) cross=false;
                }
            }
        return {cross:cross,full:false}
    }
    toString(){
        return "Center("+this.model.center.x+","+this.model.center.y+") radius("+this.model.radius+")";
    }
    getDescription(){
        return 'Circle';
    }

}