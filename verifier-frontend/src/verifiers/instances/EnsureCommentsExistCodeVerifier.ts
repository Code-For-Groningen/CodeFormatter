import CodeVerifier, { CodeWarning } from "../CodeVerifier";

function containsComment(line: string) {
    return line.includes("//") || line.includes("/*") || line.includes("*/");
}

let EnsureCommentsExistCodeVerifier: CodeVerifier = {
    verify: (code: string[]) => {
        let warnings = [] as CodeWarning[];

        // Find the first line which contains main(
        let mainLine = code.findIndex(line => line.includes("main("));

        // If there is no main, return
        if (mainLine === -1) return [];

        let codeAfterMain = code.slice(mainLine);

        // Count how many lines are comments or contain comments
        let commentLines = codeAfterMain.filter(containsComment).length;

        if(commentLines === 0) {
            warnings.push({
                line: mainLine + 1,
                message: "You need to add comments to your code. " +
                    "Comments are used to explain what your code does. " +
                    "They are not compiled, and are ignored by the computer. " +
                    "They are used to make your code easier to understand.",
            });
        }

        return warnings;
    }
}

export default EnsureCommentsExistCodeVerifier;