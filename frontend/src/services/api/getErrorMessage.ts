import axios from "axios";

export function getErrorMessage(error: unknown){
    if(axios.isAxiosError(error)){
        if(!error.response){
            return "Unable to connect. Check your internet connection."
        }

        const data = error.response.data;

        if(data?.message){
            return data.message;
        }

        if(Array.isArray(data?.errors) && data.errors.length > 0){
            return data.errors[0].message;
        };

        return "Something went wrong. Please try again.";
    }

    if(error instanceof Error){
        return error.message;
    }

    return "An unexpected error occured";
}