// src/reducer/tokenReducer.js

const tokenReducer = (userToken, action) => {
    console.log("tokenreducer");
    switch(action.type) {
        case "SET_TOKEN":
            return action.payload;
        case "UNSET_TOKEN":
            return null;
        case "CLEAR_TOKEN":
            return null;
        default:
            return userToken;
    }
}

export default tokenReducer;
