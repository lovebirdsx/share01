export class JsonConfig<T> {
    readonly data: T = undefined as T;
    constructor(t: T) {}

    get<TKey extends keyof T>(key: TKey): T[TKey] {
        return this.data[key];
    }

    set<TKey extends keyof T>(key: TKey, value: T[TKey]): void {
        this.data[key] = value;
        this.save();
    }

    protected save(): void {
        // ...
    }
}

const config = new JsonConfig({
    flowConfigPath: '',
    showId: false,
});
config.get('flowConfigPath');
config.set('flowConfigPath', '/path/to/config.json');
config.set('showId', true);
    