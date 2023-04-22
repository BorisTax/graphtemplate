import { ViewPortState } from "../atoms/viewportAtoms";
import { SetViewPortFunc } from "../customHooks/useAllAtoms";
import { Point } from "../types/properties";
import { Rectangle } from "../utils/geometry";

export function getPoint(e: any) {
  let rect = e.target.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

export function scale(factor: number, anchor: Point, viewPortData: ViewPortState) {
  const { realRect, screenRect }: ViewPortState = viewPortData;

  const rw = realRect.width * factor;
  var gridStep = viewPortData.gridStep;
  const pixelRatio = rw / screenRect.width;
  const realHeight = screenRect.height * pixelRatio;
  var dx = anchor.x - realRect.topLeft.x;
  var dy = anchor.y - realRect.topLeft.y;
  //if (realHeight < 500) return { ...viewPortData };
  dx = dx * factor;
  dy = dy * factor;
  //new topLeft
  const tl = { x: anchor.x - dx, y: anchor.y - dy };
  const br: Point = {x: 0, y: 0};
  br.x = tl.x + rw;
  br.y = tl.y - realHeight;
  //new gridStep
  if (gridStep / pixelRatio < 10) {
    if (gridStep < 1000000) gridStep = gridStep * 10;
  } else if (gridStep / pixelRatio > 100)
    if (gridStep > 0.001) gridStep = gridStep / 10;
  const gridStepPixels = Math.round(gridStep / pixelRatio);
  const newRealRect = getRealRect(tl, br) 
  return {
    ...viewPortData,
    realRect: newRealRect,
    pixelRatio,
    gridStepPixels,
    gridStep,
  };
}

export function setCurCoord(realPoint: Point, screenPoint: Point, viewPortData: ViewPortState) {
  return {
    ...viewPortData,
    curRealPoint: realPoint,
    curScreenPoint: screenPoint,
  };
}

export function setTopLeft(topLeft: Point, viewPortData: ViewPortState) {
  var bottomRight = {x: 0, y: 0};
  bottomRight.x = topLeft.x + viewPortData.realRect.width;
  bottomRight.y = topLeft.y - viewPortData.realRect.height;
  return { ...viewPortData, realRect: getRealRect(topLeft, bottomRight) };
}
export function getRealRect(topLeft: Point, bottomRight: Point): Rectangle {
  return new Rectangle(topLeft, bottomRight)
}

export function getScreenRect(viewPortWidth: number, viewPortHeight: number): Rectangle {
  return new Rectangle({x: 0, y: 0}, {x: viewPortWidth, y: viewPortHeight})
}

export function getRealAndScreenRect(viewPortData: ViewPortState) {
  return {
    realRect: getRealRect(viewPortData.realRect.topLeft, viewPortData.realRect.bottomRight),
    screenRect: getScreenRect(viewPortData.screenRect.width, viewPortData.screenRect.height)
  }
}

export function setDimensions(width: number, height: number, realWidth: number, viewPortData: ViewPortState) {
  const rh = (height * realWidth) / width;
  const br = {
    x: viewPortData.realRect.topLeft.x + realWidth,
    y: viewPortData.realRect.topLeft.y - rh,
  }
  const newRealRect = getRealRect(viewPortData.realRect.topLeft, br)
  const newScreenRect = getScreenRect(width, height)
  return {
    ...viewPortData,
    realRect: newRealRect,
    screenRect: newScreenRect,
    ratio: width / height,
    pixelRatio: realWidth / newScreenRect.width,
  };
}

export function zoomToRect({ topLeft, bottomRight }: Rectangle, viewPortData: ViewPortState): ViewPortState {
  const rectHeight = topLeft.y - bottomRight.y
  const rectWidth = bottomRight.x - topLeft.x
  const ratio = rectWidth / rectHeight
  const realWidth = ratio < viewPortData.ratio ? rectHeight * viewPortData.ratio : rectWidth

  const newViewPortData = setDimensions(viewPortData.screenRect.width, viewPortData.screenRect.height, realWidth, viewPortData);
  const point = {
    x: (topLeft.x + bottomRight.x) / 2,
    y: (topLeft.y + bottomRight.y) / 2,
  };
  let viewPortWidth = newViewPortData.realRect.width - (newViewPortData.marginLeft + newViewPortData.marginRight) * newViewPortData.pixelRatio;
  let viewPortHeight = newViewPortData.realRect.height - (newViewPortData.marginTop + newViewPortData.marginBottom) * newViewPortData.pixelRatio;
  const tl = {
    x: point.x - viewPortWidth / 2 - newViewPortData.marginLeft * newViewPortData.pixelRatio,
    y: point.y + viewPortHeight / 2 + newViewPortData.marginTop * newViewPortData.pixelRatio,
  };
  const br = {x: 0, y: 0};
  br.x = tl.x + newViewPortData.realRect.width;
  br.y = tl.y - newViewPortData.realRect.height;
  const newRealRect = getRealRect(tl, br)
  return { ...newViewPortData, realRect: newRealRect };
}

export function addWindowListeners(viewPortData: ViewPortState, setViewPortData: SetViewPortFunc, canvas: HTMLCanvasElement) {
  const spinner = document.getElementById("spinner")
  if(spinner) spinner.style.display = "none";
  const { sw, sh } = resize(viewPortData, setViewPortData, canvas);
  const newViewPortData = setDimensions(sw, sh, 10000, viewPortData);
  const rect: Rectangle = new Rectangle({ x: -100, y: 100 }, { x: 100, y: -100 })
  setViewPortData(zoomToRect(rect, newViewPortData));
  //setViewPortData((prevData) => scale(2, { x: 0, y: 0 }, prevData));


  document.body.oncontextmenu = () => true;
  document.addEventListener("load", () => {
    ///setViewPortData(zoomToTable({topLeft:{x: 0, y: 2400}, bottomRight: {x: 3000, y: 0}}, viewPortData))
  });
  window.addEventListener("resize", () => {
    resize(viewPortData, setViewPortData, canvas);
  });
  window.addEventListener("scroll", () => {
    const goTop = document.getElementById("goTop")
    if (window.scrollY >= 10 && goTop ) {
      goTop.style.display = "block";
      const listener: any = goTop.addEventListener("click", (e: Event) => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          if(e.target) e.target.removeEventListener("click", listener);
        });
    }
    if (window.scrollY < 10 && goTop ) {
      if(goTop) goTop.style.display = "none";
    }
  });
}

function resize(viewPortData: ViewPortState, setViewPortData: SetViewPortFunc, canvas: HTMLCanvasElement) {
  const wHeight = window.innerHeight;
  const cont = document.getElementById("canvas-container")
  const style = cont ? getComputedStyle(cont) : {width: ""}
  const sw = Number.parseInt(style.width);
  let sh =
    window.innerHeight <= window.innerWidth
      ? wHeight * 0.8
      : sw
  setViewPortData(setDimensions(sw, sh, viewPortData.realRect.width, viewPortData)
  );
  // canvas.width = sw;
  // canvas.height = sh;
  // canvas.style.width = sw + "px";
  // canvas.style.height = sh + "px";
  return { sw, sh };
}
