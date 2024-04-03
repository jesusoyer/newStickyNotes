'use client'
import React from 'react'
import { useState } from "react";
import 'dotenv/config'



const UserSignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

 








    const handleSubmit = (event:any) => {
        event.preventDefault(); // Prevent default form submission behavior
    
        // Perform any action with email and password (e.g., send to backend)
        console.log("Email:", email);
        console.log("Password:", password);

        const handler = async () => {
            try {
              // Google's OAuth 2.0 endpoint for requesting an access token
              const oauth2Endpoint = process.env.oAuthEndpoint;
                const clientId = process.env.clientId
                const redirect_uri = process.env.redirectUri

                
              // Parameters to pass to OAuth 2.0 endpoint.
              const params = {
                'client_id': clientId,
                'redirect_uri': redirect_uri,
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'
              };
          
              // Create query string from parameters
              const queryString = new URLSearchParams(params).toString();
          
              // URL for the authorization request
              const authorizationUrl = `${oauth2Endpoint}?${queryString}`;
          
              // Redirect the user to the authorization URL
              return {
                statusCode: 302, // Redirect status code
                headers: {
                  'Location': authorizationUrl // Redirect to the authorization URL
                }
              };
            } catch (error) {
              console.error('Error:', error);
              return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Internal Server Error' })
              };
            }
          };
          
    
          handler()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error:', error);
      });








        
        setEmail("");
        setPassword("");
        // navigate("/home");
      };


  return( <div>
  <form
    onSubmit={handleSubmit}
    className="max-w-sm mx-auto mt-40 bg-yellow-200 shadow-2xl p-4"
  >
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your email
      </label>
      <input
        type="email"
        id="email"
        value={email} // Bind value to state variable
        onChange={(e) => setEmail(e.target.value)} // Update state on change
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@flowbite.com"
        required
      />
    </div>
    <div className="mb-5">
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your password
      </label>
      <input
        type="password"
        id="password"
        value={password} // Bind value to state variable
        onChange={(e) => setPassword(e.target.value)} // Update state on change
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Sign In
    </button>
  </form>
</div>
);
}

export default UserSignIn;
