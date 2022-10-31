class EventDispatcher<T extends Record<string, (...args: any) => any>> {
    reg<K extends keyof T>(type: K, handle: T[K]) {}
    dispatch<K extends keyof T>(type: K, ...params: Parameters<T[K]>) {}
}

const eventDefine = {
    dispose: () => {},
    filterChanged: (name: string) => {},
};
const eventDispatcher = new EventDispatcher<typeof eventDefine>();
eventDispatcher.reg('filterChanged', (name: string) => {});
eventDispatcher.dispatch('dispose');
