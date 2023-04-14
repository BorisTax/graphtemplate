export enum PropertyTypes {
    POINT = 'POINT',
    NUMBER = 'NUMBER',
    POSITIVE_NUMBER = 'POSITIVE_NUMBER',
    INTEGER_POSITIVE_NUMBER = 'INTEGER_POSITIVE_NUMBER',
    BOOL = 'BOOL',
    STRING = 'STRING',
    INPUT = 'INPUT',
    LIST = 'LIST'
};

export const RegExp = {
    NUMBER: /^-?\d+\.?\d*$/,
    INTEGER_POSITIVE_NUMBER: /^[1-9]{1}\d*$/,
    POSITIVE_NUMBER: /^\d+\.?\d*$/,
    STRING: /.*/
}

export type TProperty<T> = {
    name: string,
    type: PropertyTypes,
    value: T
    get?: () => T,
    set?: (value: T) => void
}

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

export type TProperties = Property<number> | Property<string> | Property<boolean> | Property<[]> | Property<Point>

export type Point = {
    x: number,
    y: number
}

export type Rect = {
    topLeft: Point,
    bottomRight: Point
    width: number, height: number
}
export type ScreenRect = {
    x: number,
    y: number
    width: number, height: number
}