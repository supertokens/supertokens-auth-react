import { AuthenticationExpired } from "./authenticationExpired";
import { AuthenticationUpdated } from "./authenticationUpdated";

export interface AuthenticationSource {
    addListener(listener: (event: AuthenticationExpired | AuthenticationUpdated) => void): () => void;
}
