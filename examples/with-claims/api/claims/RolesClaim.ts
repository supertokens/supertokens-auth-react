import { SessionClaim } from "supertokens-node/recipe/session/claims";
import Session, { SessionClaimValidator, SessionContainer } from "supertokens-node/recipe/session";
import { roleDB } from "../mockRoleDb";

class RolesClaimClass extends SessionClaim<string[]> {
    constructor() {
        super("st-r");
        this.hasRole = {
            id: this.key,
            including: (role: string) => ({
                id: this.key,
                claim: this,
                shouldRefetch: (payload, ctx) => {
                    return this.getValueFromPayload(payload, ctx) === undefined;
                },
                validate: async (payload, ctx) => {
                    const isValid = this.getValueFromPayload(payload, ctx).includes(role);
                    return isValid
                        ? { isValid }
                        : {
                              isValid,
                              reason: { missingRole: role },
                          };
                },
            }),
        };
    }
    readonly hasRole: {
        id: string;
        including: (role: string) => SessionClaimValidator;
    };

    addRole(session: SessionContainer, role: string, userContext?: any) {
        const payload = session.getAccessTokenPayload(userContext);
        const origRoles = this.getValueFromPayload(payload, userContext);
        const newRoles = Array.from(new Set([...origRoles, role]));
        return session.mergeIntoAccessTokenPayload(this.addToPayload_internal({}, newRoles, userContext));
    }

    setRoles(session: SessionContainer, roles: string[], userContext?: any) {
        return session.mergeIntoAccessTokenPayload(this.addToPayload_internal({}, roles, userContext));
    }

    refreshRolesFromDb(session: SessionContainer, userContext?: any) {
        const roles = this.fetchValue(session.getUserId(userContext), userContext);
        return session.mergeIntoAccessTokenPayload(this.addToPayload_internal({}, roles, userContext));
    }

    async addRoleUsingSessionHandle(sessionHandle: string, role: string, userContext?: any) {
        const sessionInfo = await Session.getSessionInformation(sessionHandle, userContext);
        const origRoles = this.getValueFromPayload(sessionInfo.accessTokenPayload, userContext);
        const newRoles = Array.from(new Set([...origRoles, role]));
        return Session.mergeIntoAccessTokenPayload(
            sessionHandle,
            this.addToPayload_internal({}, newRoles, userContext)
        );
    }

    getRolesFromSession(session: SessionContainer, userContext?: any) {
        return this.getValueFromPayload(session.getAccessTokenPayload(), userContext);
    }

    setRolesUsingSessionHandle(sessionHandle: string, roles: string[], userContext: any) {
        return Session.mergeIntoAccessTokenPayload(sessionHandle, this.addToPayload_internal({}, roles, userContext));
    }

    updateRolesUsingSessionHandle(sessionHandle: string, userId: string, userContext?: any) {
        const roles = this.fetchValue(userId, userContext);
        return Session.mergeIntoAccessTokenPayload(sessionHandle, this.addToPayload_internal({}, roles, userContext));
    }

    addToPayload_internal(payload: any, value: string[], _userContext: any): any {
        return {
            ...payload,
            [this.key]: {
                v: value,
                t: new Date().getTime(),
            },
        };
    }

    removeFromPayload(payload: any, _userContext: any): any {
        const res = {
            ...payload,
        };
        delete res[this.key];
        return res;
    }

    getValueFromPayload(payload: any, _userContext: any): string[] {
        return payload[this.key]?.v;
    }

    fetchValue(userId: string, ctx: any) {
        return roleDB.get(userId) || [];
    }
}

export const RolesClaim = new RolesClaimClass();
