class User {
    member: number;
    username:string;
    email: string;
    dpi: string;
    birthdate:Date;
    password: string;
    role: string; // 'admin' o 'user'

    constructor(member: number, username: string, dpi: string, email: string, birthdate: Date, password: string, role: string) {
        this.member = member;
        this.username = username;
        this.dpi = dpi;
        this.email = email;
        this.birthdate = birthdate;
        this.password = password;
        this.role = role;
    }
}

export default User;
