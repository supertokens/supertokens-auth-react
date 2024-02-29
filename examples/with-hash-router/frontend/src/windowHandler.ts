import { WindowHandlerInterface } from "supertokens-website/utils/windowHandler/types";

const getLocationInfoFromURLHash = () => {
    const { hash, origin } = window.location;

    const url = new URL(`${origin}${hash.substring(1)}`);
    return { search: url.search, pathname: url.pathname, hash: url.hash };
};

export default function getWindowHandler(original: WindowHandlerInterface): WindowHandlerInterface {
    return {
        ...original,
        location: {
            ...original.location,
            getSearch() {
                return getLocationInfoFromURLHash().search;
            },
            getPathName() {
                return getLocationInfoFromURLHash().pathname;
            },
            getHash() {
                return getLocationInfoFromURLHash().hash;
            },
        },
    };
}
