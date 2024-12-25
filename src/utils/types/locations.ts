export interface Location {
    id?: string;
    title: string;
    address: string;
    employee: {
        name: string;
        position: string;
        email: string;
        phone: string;
    };
}