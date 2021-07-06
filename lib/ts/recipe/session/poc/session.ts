import { RequireSession } from "./requireSession";
import { OnExpiredSession } from "./onExpiredSession";
import { ProvideSessionFromRecipe } from "./provideSessionFromRecipe";

export const Session = {
    Require: RequireSession,
    Provide: ProvideSessionFromRecipe,
    OnExpired: OnExpiredSession,
};
