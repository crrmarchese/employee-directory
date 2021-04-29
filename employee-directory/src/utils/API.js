import axios from "axios";

// Export an object containing methods we'll use for accessing the Random User API-https://randomuser.me/

export default {
  getRandomUser: function() {
    return axios.get("https://randomuser.me/api/?results=50&nat=us&exc=login")
  }
};
