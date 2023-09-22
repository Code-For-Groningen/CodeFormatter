import CodeVerifier, { CodeWarning } from "../CodeVerifier";


const expectedKeywords = [
    "while", "for", "if", "else", "do", "switch"
];

var EnsureBracketsInStatementsVerifier: CodeVerifier = {
    verify(code: string[]) {
        let warnings = [] as CodeWarning[];
        code.forEach((line, index) => {
            // Check if any expected keyword is in the line
            let keywordFound = undefined;
            for (let i = 0; i < expectedKeywords.length; i++) {
                if (line.includes(expectedKeywords[i])) {
                    keywordFound = expectedKeywords[i];
                    break;
                }
            }

            // If keyword found, check if there is a bracket
            if (keywordFound && !line.includes("{")) {
                warnings.push({
                    line: index + 1,
                    message: "Expected a bracket after '" + keywordFound + "'"
                });
            }
        });

        return warnings;
    },
}

export default EnsureBracketsInStatementsVerifier;