export interface CodeWarning {
    line: number;
    message: string;
}

export default interface CodeVerifier {
    /**
     * This method is called when the code is being verified.
     * 
     * @param code The code to verify.
     * @return A list of errors. If the list is empty, the code is valid.
     */
    verify: (code: string[]) => CodeWarning[];
}

