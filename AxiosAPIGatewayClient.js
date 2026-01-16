const axios = require('axios');

/**
 * AWS API Gateway Client using Axios
 * Simplifies making requests to your API Gateway endpoints
 */
class AxiosAPIGatewayClient {
  /**
   * Constructor
   * @param {string} apiEndpoint - Your API Gateway endpoint URL
   * @param {string} apiKey - (Optional) API Key for authentication
   */
  constructor(apiEndpoint, apiKey = null) {
    // Create an axios instance with base configuration
    this.client = axios.create({
      baseURL: apiEndpoint,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });

    // Add API Key to headers if provided
    if (apiKey) {
      this.client.defaults.headers['x-api-key'] = apiKey;
    }

    // Add response interceptor for better error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // Server responded with error status
          console.error(`API Error [${error.response.status}]:`, error.response.data);
        } else if (error.request) {
          // Request made but no response
          console.error('No response received:', error.request);
        } else {
          // Error in request setup
          console.error('Request error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request
   * @param {string} path - API path (e.g., '/users')
   * @param {object} config - Additional axios config (headers, params, etc.)
   * @returns {Promise} Response data
   */
  async get(path, config = {}) {
    try {
      const response = await this.client.get(path, config);
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.response?.status || null,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * POST request
   * @param {string} path - API path (e.g., '/users')
   * @param {object} data - Request body data
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async post(path, data, config = {}) {
    try {
      const response = await this.client.post(path, data, config);
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.response?.status || null,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * PUT request
   * @param {string} path - API path (e.g., '/users/123')
   * @param {object} data - Request body data
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async put(path, data, config = {}) {
    try {
      const response = await this.client.put(path, data, config);
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.response?.status || null,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * DELETE request
   * @param {string} path - API path (e.g., '/users/123')
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async delete(path, config = {}) {
    try {
      const response = await this.client.delete(path, config);
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.response?.status || null,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * PATCH request
   * @param {string} path - API path (e.g., '/users/123')
   * @param {object} data - Request body data
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async patch(path, data, config = {}) {
    try {
      const response = await this.client.patch(path, data, config);
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.response?.status || null,
        error: error.response?.data || error.message,
      };
    }
  }
}

// async function main() {
//   // Initialize the client with your API Gateway endpoint
//   const apiEndpoint = 'https://xxxxx.execute-api.us-east-1.amazonaws.com/test';
//   // const apiKey = 'your-api-key-here'; // Optional, remove if not needed

//   const client = new AxiosAPIGatewayClient(apiEndpoint, apiKey);

//   console.log('=== AWS API Gateway Client Examples ===\n');

//   // Example 1: POST request to create a user
//   console.log('1. Creating a new user...');
//   const createUserResponse = await client.post('/users', {
//     name: 'John Doe',
//     email: 'john@example.com',
//     age: 30,
//   });
//   console.log('Response:', createUserResponse);
//   console.log('');

//   // Example 2: GET request to fetch all users
//   console.log('2. Fetching all users...');
//   const getAllUsersResponse = await client.get('/users');
//   console.log('Response:', getAllUsersResponse);
//   console.log('');

//   // Example 3: GET request with query parameters
//   console.log('3. Fetching users with filters...');
//   const getFilteredUsersResponse = await client.get('/users', {
//     params: {
//       limit: 10,
//       offset: 0,
//     },
//   });
//   console.log('Response:', getFilteredUsersResponse);
//   console.log('');

//   // Example 4: GET request to fetch a specific user by ID
//   console.log('4. Fetching a specific user...');
//   const getUserByIdResponse = await client.get('/users/123');
//   console.log('Response:', getUserByIdResponse);
//   console.log('');

//   // Example 5: PUT request to update a user
//   console.log('5. Updating a user...');
//   const updateUserResponse = await client.put('/users/123', {
//     name: 'Jane Doe',
//     email: 'jane@example.com',
//     age: 28,
//   });
//   console.log('Response:', updateUserResponse);
//   console.log('');

//   // Example 6: PATCH request to partially update a user
//   console.log('6. Partially updating a user...');
//   const patchUserResponse = await client.patch('/users/123', {
//     age: 29,
//   });
//   console.log('Response:', patchUserResponse);
//   console.log('');

//   // Example 7: DELETE request to remove a user
//   console.log('7. Deleting a user...');
//   const deleteUserResponse = await client.delete('/users/123');
//   console.log('Response:', deleteUserResponse);
//   console.log('');

//   // Example 8: Handling errors
//   console.log('8. Testing error handling...');
//   const errorResponse = await client.get('/users/nonexistent');
//   if (!errorResponse.success) {
//     console.log('Error occurred:', errorResponse.error);
//   }
// }

// // Run the examples
// main().catch(console.error);

// ============================================
// ALTERNATIVE: Use as a module
// ============================================

// Export for use in other files
module.exports = AxiosAPIGatewayClient;