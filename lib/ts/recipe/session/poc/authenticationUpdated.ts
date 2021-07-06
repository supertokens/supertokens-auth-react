import { Authentication } from "./authentication";

export class AuthenticationUpdated {
    constructor(public readonly authentication: Authentication) { }
}
