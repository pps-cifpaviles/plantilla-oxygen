
export const errorMessage = (error) =>{
    let errors = "";
    if (error.status){
    // The server responded with an error status code
    const errorData = error.response.data;
    if (errorData) {
      // Extract and format errors
      const formattedErrors = {};
      errorData.errors.forEach((err) => {
        formattedErrors[err.path] = err.msg; // Key errors by field name
      });
      errors=formattedErrors;
    } else {
      // Handle other server errors (e.g., generic message)
      errors={ form: 'An error occurred. Please try again.' };
    }
  } else if (error.request) {
    // The request was made but no response was received
    errors={ form: 'No response from server. Please check your network.' };
  } else {
    // Something happened in setting up the request that triggered an Error
    errors={ form: 'Error setting up request: ' + error.message };
  }
  return  JSON.stringify(errors);
}