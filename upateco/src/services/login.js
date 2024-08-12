import axios from "axios";

/**
 * All information from the supplier is brought
 */
export const getLoginUser = async ({ username, password }) => {
    const url = https://sandbox.academiadevelopers.com/api-auth/

    const response = await axios.post(
        url,
        {
          username: username,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      return response.data;
    
  };