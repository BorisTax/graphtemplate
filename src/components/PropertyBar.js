import React from 'react';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import InputField from './InputField'
import ToolButtonBar from './ToolButtonBar';
import CheckBox from './CheckBox'; 
import { useSelector } from 'react-redux';
import useActions from '../customHooks/useActions';
import { PropertyTypes } from './shapes/PropertyData';
import Shape from './shapes/Shape';
import MoveButtonsPanel from './MoveButtonsPanel';
import { WORKSPACE } from '../reducers/initialState';
import FasadePropertyBar from './FasadePropertyBar';

export default function PropertyBar() {

  return <ToolBar caption={captions.title}>

  </ToolBar>
}

function getProperties(object, appData, updateState) {
  const props = [];
  for (let p of object.getProperties()) {
    if(p.hidden) continue
    const value = getValueElement(p, updateState);
    const prop = (
      <>
        <div>{appData.captions.toolbars.property[p.key]}</div>
        {value}
      </>
    );
    props.push(prop);
  }
  return props
}

function getValueElement(p, updateState) {
  if (p.editable) {
    switch (p.type) {
      case PropertyTypes.STRING: return <InputField type={p.type} value={p.value} setValue={(value) => { p.setValue(value); updateState() }} />
      case PropertyTypes.INTEGER_POSITIVE_NUMBER: return <InputField type={p.type} value={p.value} setValue={(value) => { p.setValue(value); updateState() }} />
      case PropertyTypes.BOOL: return <CheckBox value={p.value} onChange={(value) => { p.setValue(value); updateState() }} />
      default:
    }
  } else {
    return <div>{p.value}</div>;
  }
}