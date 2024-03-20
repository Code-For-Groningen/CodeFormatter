import CodeVerifier from "../CodeVerifier";

var IntMainParamVerifier: CodeVerifier = {
    verify: (code: string[]) => {
        let indexOf = code.indexOf("int main() {");

        if (indexOf !== -1)
            return [{
                line: indexOf + 1,
                message: "It looks like you forgot to add parameters to the main function. " +
                    "It should be int main(int argc, char** argv) {",
            }];

        return [];
    }
}

export default IntMainParamVerifier;