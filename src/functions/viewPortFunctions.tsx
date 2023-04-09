import { ViewPortState } from "../atoms/viewportAtoms";
import { SetViewPortFunc } from "../customHooks/useAllAtoms";
import { Point, Rect } from "../types/properties";

export function getPoint(e: any) {
  let rect = e.target.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

export function scale(factor: number, anchor: Point, viewPortData: ViewPortState) {
  const { realWidth, viewPortWidth, viewPortHeight, topLeft }: ViewPortState = viewPortData;
  const rw = realWidth * factor;
  var gridStep = viewPortData.gridStep;
  const pixelRatio = rw / viewPortWidth;
  const realHeight = viewPortHeight * pixelRatio;
  var dx = anchor.x - topLeft.x;
  var dy = anchor.y - topLeft.y;
  if (realHeight < 500) return { ...viewPortData };
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
  return {
    ...viewPortData,
    realWidth: rw,
    realHeight,
    topLeft: tl,
    bottomRight: br,
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
  bottomRight.x = topLeft.x + viewPortData.realWidth;
  bottomRight.y = topLeft.y - viewPortData.realHeight;
  return { ...viewPortData, topLeft, bottomRight };
}
export function getRealRect(topLeft: Point, bottomRight: Point): Rect {
  return {
    topLeft,
    bottomRight,
    width: bottomRight.x - topLeft.x,
    height: topLeft.y - bottomRight.y
  }
}

export function getScreenRect(viewPortWidth: number, viewPortHeight: number): Rect {
  return {
    topLeft: {x: 0, y: 0},
    width: viewPortWidth,
    height: viewPortHeight,
    bottomRight: {x: viewPortWidth, y: viewPortHeight}
  }
}

export function getRealAndScreenRect(viewPortData: ViewPortState) {
  return {
    realRect: getRealRect(viewPortData.topLeft, viewPortData.bottomRight),
    screenRect: getScreenRect(viewPortData.viewPortWidth, viewPortData.viewPortHeight)
  }
}

export function setDimensions(width: number, height: number, realWidth: number, viewPortData: ViewPortState) {
  const rh = (height * realWidth) / width;
  return {
    ...viewPortData,
    viewPortWidth: width,
    viewPortHeight: height,
    realWidth: realWidth,
    ratio: width / height,
    pixelRatio: realWidth / viewPortData.viewPortWidth,
    realHeight: rh,
    bottomRight: {
      x: viewPortData.topLeft.x + realWidth,
      y: viewPortData.topLeft.y - rh,
    },
  };
}

export function zoomToRect({ topLeft, bottomRight }: Rect, viewPortData: ViewPortState): ViewPortState {
  const rectHeight = topLeft.y - bottomRight.y
  const rectWidth = bottomRight.x - topLeft.x
  const ratio = rectWidth / rectHeight
  const realWidth = ratio < viewPortData.ratio ? rectHeight * viewPortData.ratio : rectWidth

  const newViewPortData = setDimensions(viewPortData.viewPortWidth, viewPortData.viewPortHeight, realWidth, viewPortData);
  const point = {
    x: (topLeft.x + bottomRight.x) / 2,
    y: (topLeft.y + bottomRight.y) / 2,
  };
  let viewPortWidth = newViewPortData.realWidth - (newViewPortData.marginLeft + newViewPortData.marginRight) * newViewPortData.pixelRatio;
  let viewPortHeight = newViewPortData.realHeight - (newViewPortData.marginTop + newViewPortData.marginBottom) * newViewPortData.pixelRatio;
  const tl = {
    x: point.x - viewPortWidth / 2 - newViewPortData.marginLeft * newViewPortData.pixelRatio,
    y: point.y + viewPortHeight / 2 + newViewPortData.marginTop * newViewPortData.pixelRatio,
  };
  const br = {x: 0, y: 0};
  br.x = tl.x + newViewPortData.realWidth;
  br.y = tl.y - newViewPortData.realHeight;
  return { ...newViewPortData, topLeft: tl, bottomRight: br };
}

export function addWindowListeners(viewPortData: ViewPortState, setViewPortData: SetViewPortFunc, canvas: HTMLCanvasElement) {
  const spinner = document.getElementById("spinner")
  if(spinner) spinner.style.display = "none";
  const { sw, sh } = resize(viewPortData, setViewPortData, canvas);
  const newViewPortData = setDimensions(sw, sh, 10000, viewPortData);
  setViewPortData(zoomToRect({ topLeft: { x: -100, y: 100 }, bottomRight: { x: 100, y: -100 } }, newViewPortData));
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
  setViewPortData(setDimensions(sw, sh, viewPortData.realWidth, viewPortData)
  );
  // canvas.width = sw;
  // canvas.height = sh;
  // canvas.style.width = sw + "px";
  // canvas.style.height = sh + "px";
  return { sw, sh };
}
