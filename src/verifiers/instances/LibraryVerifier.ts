import CodeVerifier, { CodeWarning } from "../CodeVerifier";

var LibraryVerifier: CodeVerifier = {
    verify: (code: string[]) => {
        let warnings = [] as CodeWarning[];

        // Go through all lines of code
        for (let i = 0; i < code.length; i++) {
            // Check if line includes #include<[a-zA-Z0-9_]+(?:\.h){0,1}>
            if (/#include<[a-zA-Z0-9_]+(?:\.h){0,1}>/gm.test(code[i])) {
                warnings.push({ line: i, message: "#include statement has no space in it! Consider adding one" });
            }
        }

        // Join the code in a long line
        let joinedCode = code.join(" ");

        // Check for stdio.h
        if (!joinedCode.includes("#include<stdio.h>") || !joinedCode.includes("#include <stdio.h>")) {
            warnings.push({ line: 0, message: "Code does not #include <stdio.h>!" });
        }

        // Check for stdlib.h
        if (!joinedCode.includes("#include<stdlib.h>") || !joinedCode.includes("#include <stdlib.h>")) {
            warnings.push({ line: 0, message: "Code does not #include <stdlib.h>!" });
        }

        return warnings;
    }
}

export default LibraryVerifier;