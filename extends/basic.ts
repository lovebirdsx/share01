type T1 = Exclude<'A' | 'B', 'B' | 'C'>;

interface Person {
    name: string;
    id: number;
    age: number;
}

type T2 = Pick<Person, 'name' | 'id'>;
