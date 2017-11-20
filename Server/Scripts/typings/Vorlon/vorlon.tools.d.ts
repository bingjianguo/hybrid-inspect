export declare class Tools {
    static IsWindowAvailable: boolean;
    static QuerySelectorById(root: HTMLElement, id: string): HTMLElement;
    static SetImmediate(func: () => void): void;
    static setLocalStorageValue(key: string, data: string): void;
    static getLocalStorageValue(key: string): any;
    static Hook(rootObject: any, functionToHook: string, hookingFunction: (...optionalParams: any[]) => void): void;
    static HookProperty(rootObjectName: string, propertyToHook: string, callback: any): void;
    static getCallStack(skipped: any): any;
    static CreateCookie(name: string, value: string, days: number): void;
    static ReadCookie(name: string): string;
    static CreateGUID(): string;
    static RemoveEmpties(arr: string[]): number;
    static AddClass(e: HTMLElement, name: string): HTMLElement;
    static RemoveClass(e: HTMLElement, name: string): HTMLElement;
    static ToggleClass(e: HTMLElement, name: string, callback?: (hasClass: boolean) => void): void;
    static htmlToString(text: any): any;
}
export declare class FluentDOM {
    element: HTMLElement;
    childs: Array<FluentDOM>;
    parent: FluentDOM;
    constructor(nodeType: string, className?: string, parentElt?: Element, parent?: FluentDOM);
    static forElement(element: HTMLElement): FluentDOM;
    addClass(classname: string): this;
    toggleClass(classname: string): this;
    className(classname: string): this;
    opacity(opacity: string): this;
    display(display: string): this;
    hide(): this;
    visibility(visibility: string): this;
    text(text: string): this;
    html(text: string): this;
    attr(name: string, val: string): this;
    editable(editable: boolean): this;
    style(name: string, val: string): this;
    appendTo(elt: Element): this;
    append(nodeType: string, className?: string, callback?: (fdom: FluentDOM) => void): this;
    createChild(nodeType: string, className?: string): FluentDOM;
    click(callback: (EventTarget) => void): this;
    blur(callback: (EventTarget) => void): this;
    keydown(callback: (EventTarget) => void): this;
}
