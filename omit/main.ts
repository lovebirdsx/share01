interface Foo {
    name: string;
    id: number;
}

type Bar = Omit<Foo, 'id'>;
