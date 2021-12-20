export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    role: { type: string, default:'user' }
}

export interface userResponse {
    user: User;
}