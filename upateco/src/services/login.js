import axios from "axios";

/**
 * All information from the supplier is brought
 */
export const getLoginUser = async ({ username, password }) => {
  const url = `https://sandbox.academiadevelopers.com/users/profiles/login/`

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


export const getTokenUser = async ({ username, password }) => {
    const url = `https://sandbox.academiadevelopers.com/api-auth/`

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


  export const getProfileUser = async ({access_token}) => {
    console.log(access_token)
    const url = `https://sandbox.academiadevelopers.com/users/profiles/profile_data/`;

    const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${access_token}`
        }
    });

    return response;
};
