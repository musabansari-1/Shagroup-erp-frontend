import axios from "axios";

const setAuthorizationToken = (token) => {
  if (token) {
    console.log('Token is ' + token);
    axios.defaults.headers.common['Authorization'] = ` Token ${token}`;
    console.log(axios.defaults.headers.common['Authorization']);
  
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthorizationToken;
