
export interface LoginCredential {
    email: string;
    password: string;
}

export interface AuthResult {
    token: string;
    success: boolean;
    errors?: string[];
}

export interface UserRegistration {
    username: string;
    email: string;
    password: string;
}
