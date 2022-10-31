type T1 = 'a' | 'b';
type T2 = 'b' | 'c';
type R1 = T1 | T2;

interface T {
    name: string;
}

interface U {
    id: number;
}

type R = T | U;
