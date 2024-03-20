import CodeVerifier, { CodeWarning } from "../CodeVerifier";

var SkeletonVerifier: CodeVerifier = {
    verify(code) {
        // Parse the first 4 lines of the code
        // They should match this format
        /* file : <any file name>.c */
        /* author : Joe Sixpack (j.sixpack@student.rug.nl) */
        /* date : Mon Sep 4 2023 */
        /* version: 1.0 */

        // Check if the first line is correct
        let warnings = [] as CodeWarning[];

        if (!code[0].trimStart().startsWith("/* file") || !code[0].endsWith(".c */")) {
            warnings.push({
                line: 1,
                message: "The first line of the code should be /* file : <any file name>.c */",
            });
        }

        // Check if the second line is correct
        if (!code[1].trimStart().startsWith("/* author") || !code[1].includes("*/")) {
            warnings.push({
                line: 2,
                message: "The second line of the code should be /* author : <your name> (<your email>) */",
            });
        } else {
            // Check if an email exists
            let emailRegex = /[sS][0-9]+@rug.nl|[sS][0-9]+@student.rug.nl/;
            if (emailRegex.test(code[1])) {
                warnings.push({
                    line: 2,
                    message: "Your email address is not your student number! It's s.name@student.rug.nl",
                });
            }
        }

        // Check if the third line is correct
        if (!code[2].trimStart().startsWith("/* date") || !code[2].includes("*/")) {
            warnings.push({
                line: 3,
                message: "The third line of the code should be /* date : <any date> */",
            });
        } else {
            let recommendedDate = new Date();
            // Format Mon Sep 4 2023
            let formattedDate = recommendedDate.toString().split(" ").slice(0, 4).join(" ");
            if(!code[2].includes(formattedDate)) {
                warnings.push({
                    line: 3,
                    message: "The recommended date is " + formattedDate,
                });
            }
        }

        // Check if the fourth line is correct
        if (!code[3].trimStart().startsWith("/* version") || !code[3].includes("*/")) {
            warnings.push({
                line: 4,
                message: "The fourth line of the code should be /* version : <any version> */",
            });
        } else {
            if (!code[3].includes(".")) {
                warnings.push({
                    line: 4,
                    message: "The version is invalid! It should contain a period! A valid example is \"1.0\"",
                });
            }
        }
        // Check if somewhere in the next 3 lines they use the word Description or description

        let descriptionFound = false;
        for (let i = 4; i < 7; i++) {
            if (code[i].toLowerCase().includes("description")) {
                descriptionFound = true;
                break;
            }
        }

        if (!descriptionFound) {
            warnings.push({
                line: 5,
                message: "Cannot seem to find a description in your code! Check the style guide for how to do that!",
            });
        }

        return warnings;
    }
}

export default SkeletonVerifier;