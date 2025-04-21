// function userReducer(user, action) {
//     console.log("userreducer");
//     switch(action.type){
//         case "SET_USER":{
//             return action.payload;
//         }
//         case "UNSET_USER":{
//             return {};
//         }
//         case "CLEAR_USER":{
//             return {};
//         }
//         default: return user;
//     }
// }
// export default userReducer;

function userReducer(user, action) {
    switch (action.type) {
      case "SET_USER":
        return action.payload;
      case "CLEAR_USER":
        return null;
      default:
        return user;
    }
  }
  export default userReducer;
  