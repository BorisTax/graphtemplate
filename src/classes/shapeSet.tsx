import Shape from "../components/shapes/Shape"

export class ShapeSet extends Set<Shape>{
    add(item: Shape){
        const res = super.add(item)
        return res 
      }
    delete(item: Shape){
    const res = super.delete(item)
    return res
    }
    has(item: Shape){
    return super.has(item)
    }
    clear(){
    return super.clear()
    }
}

export class SelectionSet extends Set<Shape>{
    add(item: Shape){
      const res = super.add(item)
      if(item.onAddToSelection) item.onAddToSelection()
      return res 
    }
    delete(item: Shape){
      const res = super.delete(item)
      if(item.onDeleteFromSelection) item.onDeleteFromSelection()
      return res
    }
    has(item: Shape){
      return super.has(item)
    }
    clear(){
      for(let p of this) if(p.onDeleteFromSelection) p.onDeleteFromSelection()
      return super.clear()
    }
}