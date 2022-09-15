export interface IUsuario {
    email: string;
    password: string
}


export interface ILogin {
    id: number;
    email: string;
    password: string
}



export type Login = Omit<ILogin, "password">