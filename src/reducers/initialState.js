import SelectCursor from "../components/shapes/cursors/SelectCursor";
import { captions } from '../locale/ru.js';
import { getNewDate, isMobile, Status } from "./functions";
import jwtDecode from "jwt-decode";
import { getViewPortState } from "../components/ViewPortContainer";
import { createFasades, createNewState } from "./createNewState";
import { getButtonPressed } from "./panelReducer";
import { SelectionSet } from "./panels";
import { getFasadBases } from "./materialReducer";

var user = { name: "", activated: false };
var token = localStorage.getItem('token') || sessionStorage.getItem('token');
if (!token) {
  const cookieToken = document.cookie.split("; ").map(i => i.split("=")).find(i => i[0] === 'token')
  if (Array.isArray(cookieToken)) token = cookieToken[1]
}

if (token) {
  user = jwtDecode(token)
  user.token = token;
}

export function getInitialState(data) {
  const { wardrobe, panels } = createNewState(data)
  return {
    cursor: new SelectCursor({ x: 0, y: 0 }),
    curShape: null,
    prevStatus: Status.FREE,
    selectedObject: new SelectionSet(),
    dimensions: new Set(),
    shapes: new Set(panels),
    toolButtonsPressed: getButtonPressed(),
    status: Status.FREE,
    isMobile: isMobile(),
  }
}