import CodeVerifier, { CodeWarning } from "../CodeVerifier";

var LineLengthVerifier: CodeVerifier = {
    verify(code: string[]) {
        let warnings = [] as CodeWarning[];
        code.forEach((line, index) => {
            if (line.length > 120) {
                warnings.push({
                    line: index + 1,
                    message: "Lines should generally be under 120 characters! If there's both comments and code on this line, move the comment above, or if a comment is too long you can split it in multiple lines!"
                });
            }
        });

        return warnings;
    }
}

export default LineLengthVerifier;