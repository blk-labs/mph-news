import errorMapping from "../utilities/error-mapping.json";

class ErrorService {
    public static resolveCode = (code: any) => {
        const errors = errorMapping as any;
        if(!errors[code]) {
            return {
                code,
                message: 'Unknown Error!'
            };
        }

        return {
            code,
            message: errors[code]
        }
    }
}

export default ErrorService;