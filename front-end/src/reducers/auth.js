const initial = {
    user: null,
    organisation: null,
    token: null,
    cypher: null,
    someKey: null,
    statement: []
}

const auth = (state = false, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            return true;
        case 'USER_SIGN_OUT':
            return false;
        default:
            return { ...initial, statement: ['hihihi']}
    }
}

export default auth