import CodeVerifier, { CodeWarning } from "../CodeVerifier";

var LibraryVerifier: CodeVerifier = {
    verify: (code: string[]) => {
        let warnings = [] as CodeWarning[];

        // Check for #include <stdlib.h> and #include <stdio.h>
        if (!code.includes("#include <stdlib.h>")) {
            warnings.push({
                line: 0,
                message: "Missing #include <stdlib.h>",
            });
        }

        if (!code.includes("#include <stdio.h>")) {
            warnings.push({
                line: 0,
                message: "Missing #include <stdio.h>",
            });
        }

        return warnings;
    }
}

export default LibraryVerifier;