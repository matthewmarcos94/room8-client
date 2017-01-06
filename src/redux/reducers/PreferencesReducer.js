const userReducerInitialState = {
    isLonggedIn: false,
    userId: '',
    status: 'I am looking for a room',
    username: '',
    fullName: '',
    contactNumber: '',
    sex: 'ApacheHelicopter',
    gender: 'ApacheHelicopter',
    course: '',
    batch:'',
    birthDate: null,
    organizations: [],
    hobbies: [],
    interests: [],
    bio: ''
};

export const userReducer = (state = userReducerInitialState, action) => {
    switch (action.type) {
        case 'ACTION_TYPE_1': {
            return state;
        }
        case 'ACTION_TYPE_2': {
            return state;
        }
        default: {
            return state;
        }
    }
}