class ServiceException extends Error {

    code: number;
    

    constructor(code: number, message: string) {
        super(message);
        this.code = code;     
    }
}

Object.seal(ServiceException);
export = ServiceException;