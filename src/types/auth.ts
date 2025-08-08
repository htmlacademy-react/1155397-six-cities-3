export type Token = string;

export type TUser = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: Token;
};

export type TAuth = {
    email: string;
    password: string;
}
