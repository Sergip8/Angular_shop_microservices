export interface RegistrationResponse{
    name: string  
    password: string  
    email: string  
  
}
export interface AuthRequest{
    data: UserRequest | LoginRequest
    success: boolean
    message: string
}
export interface UserRequest{
    ID: string
    name: string
    email: string
    role: Role[]
}
export interface LoginRequest{
    user: UserRequest
    token: string
}
export interface LoginResponse{
    email: string
    password: string
}
export enum Role{
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}