export type Authentication<T = any> = Readonly<{
    userId: string;
    jwtPayload: T;
}>;
