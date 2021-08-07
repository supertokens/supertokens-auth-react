const override = (ogImpl) => {
    return {
        ...ogImpl,
        signInAndUp: async (input) => {
            // TODO:
            return ogImpl.signInAndUp(input);
        },
        getUserById: async (input) => {
            // TODO:
            return ogImpl.getUserById(input);
        },
        getUserByThirdPartyInfo: async (input) => {
            // TODO:
            return ogImpl.getUserByThirdPartyInfo(input);
        },
        signUp: async (input) => {
            // TODO:
            return ogImpl.signUp(input);
        },
        signIn: async (input) => {
            // TODO:
            return ogImpl.signIn(input);
        },
        getUserByEmail: async (input) => {
            // TODO:
            return ogImpl.getUserByEmail(input);
        },
    };
};
module.exports = { override };
