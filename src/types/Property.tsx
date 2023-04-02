import { PropertyTypes, TProperty } from "./properties"

export default class Property<T> {
    name: string
    type: PropertyTypes
    value: T
    constructor({ name, type, value, get, set }: TProperty<T>) {
        this.name = name
        this.type = type
        this.value = value
        if (get) this.get = get
        if (set) this.set = set
    }
    get() { return this.value }
    set(value: T) { this.value = value }
}