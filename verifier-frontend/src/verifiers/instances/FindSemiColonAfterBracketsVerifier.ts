import CodeVerifier from "../CodeVerifier";

let FindSemiColonAfterBracketsVerifier: CodeVerifier = {
    verify(code) {
        let warnings = [] as any[];
        for (let i = 0; i < code.length; i++) {
            if (code[i].includes("};")) {
                warnings.push({
                    line: i + 1,
                    message: "You accidentally put a semicolon after a bracket. Those are not needed!",
                });
            }
        }
        return warnings;
    },
}

export default FindSemiColonAfterBracketsVerifier;