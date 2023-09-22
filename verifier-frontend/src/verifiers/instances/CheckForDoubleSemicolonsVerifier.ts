import CodeVerifier, { CodeWarning } from "../CodeVerifier";

var CheckForDoubleSemicolonsVerifier : CodeVerifier = {
    verify(code) {
        let warnings = [] as CodeWarning[];
        code.forEach((line, index) => {
            if(line.includes(";;")) {
                warnings.push({
                    line: index + 1,
                    message: "Double semicolon found"
                });
            }
        });

        return warnings;
    }
}

export default CheckForDoubleSemicolonsVerifier;