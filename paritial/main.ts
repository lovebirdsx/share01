type RenderType = 'string' | 'number' | 'object';

class Scheme<T> {
    name = '';
    cnName = '空';
    renderType: RenderType = 'string';
    createDefault(): T {
        return undefined as T;
    }
}

function createScheme<T>(type: Partial<Scheme<T>>): Scheme<T> {
    const scheme = new Scheme<T>();
    Object.assign(scheme, type);
    return scheme;
}

const nameScheme = createScheme<string>({
      cnName: '名字',
      createDefault: () => '名字',
});
