import { Alert, Box, Button, CssBaseline, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { formatCode } from "./backend/CodeFormattingBackend";
import CodeEditor from "./editor/CodeEditor";
import { CodeWarning } from "./verifiers/CodeVerifier";

import LibraryVerifier from "./verifiers/instances/LibraryVerifier";
import SkeletonVerifier from "./verifiers/instances/SkeletonVerifier";
import IntMainParamVerifier from "./verifiers/instances/IntMainParamVerifier";
import FindSemiColonAfterBracketsVerifier from "./verifiers/instances/FindSemiColonAfterBracketsVerifier";
import EnsureCommentsExistCodeVerifier from "./verifiers/instances/EnsureCommentsExistCodeVerifier";
import EnsureBracketsInStatementsVerifier from "./verifiers/instances/EnsureBracketsInStatementsVerifier";
import CheckForDoubleSemicolonsVerifier from "./verifiers/instances/CheckForDoubleSemicolonsVerifier";
import LineLengthVerifier from "./verifiers/instances/LineLengthVerifier";

const verifierList = [
  LibraryVerifier,
  SkeletonVerifier,
  IntMainParamVerifier,
  FindSemiColonAfterBracketsVerifier,
  EnsureCommentsExistCodeVerifier,
  EnsureBracketsInStatementsVerifier,
  CheckForDoubleSemicolonsVerifier,
  LineLengthVerifier
];

function runVerifiers(formattedCode: string): CodeWarning[] {
  let splitCode = formattedCode.split("\n");

  let warnings: CodeWarning[] = [];
  for (let verifier of verifierList) {
    let verifierWarnings = verifier.verify(splitCode);
    warnings = warnings.concat(verifierWarnings);
  }
  return warnings;
}

function preFormatCode(code: string): string {
  // Replace \r\n with \n
  code = code.replace(/\r\n/g, "\n");

  // Remove leading empty lines
  let splitCode = code.split("\n");
  while (splitCode[0].trim() === "") {
    splitCode.shift();
  }

  // Remove trailing empty lines
  while (splitCode[splitCode.length - 1].trim() === "") {
    splitCode.pop();
  }

  // Add a newline at the end
  splitCode.push("");

  return splitCode.join("\n");
}

function CodeWarningComponent(props: { warning: CodeWarning, onDelete: () => void }) {
  return <Box my={1}>
    <Alert severity="warning" onClose={props.onDelete}>
      <Box display="flex" flexDirection="column" justifyContent="space-around">
        <Box flexGrow={1}>
          <Typography variant="body1" fontFamily="JetBrains Mono">
            {props.warning.message}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" color="#666">
            Line {props.warning.line}
          </Typography>
        </Box>
      </Box>
    </Alert>
  </Box>
}

function CodeWarningOkay() {
  return <Box my={1}>
    <Alert severity="success">
      <Box display="flex" flexDirection="column" justifyContent="space-around">
        <Box flexGrow={1}>
          <Typography variant="body1" fontFamily="JetBrains Mono">
            Your code seems okay! Keep in mind, that TAs might still find other issues with your code.
          </Typography>
        </Box>
      </Box>
    </Alert>
  </Box>
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  let [code, setCode] = useState<string>();
  let [currentWarnings, setCurrentWarnings] = useState<CodeWarning[]>([]);

  useEffect(() => {
    // Fetch previous code from the local storage
    let previousCode = localStorage.getItem("code");
    if (previousCode) setCode(previousCode);
  }, []);

  useEffect(() => {
    // Save code to local storage
    if (code) localStorage.setItem("code", code);
  }, [code]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container sx={{
        backgroundColor: "rgb(30, 30, 30)",
      }}>
        <Grid item xs={12} textAlign="center" fontSize="2em" height="10vh"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container>
            <Grid item xs={6} textAlign="center">
              <Typography variant="h4">Code Verifier (by Code For Groningen & Matt) </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} justifyContent={"space-around"}>
                <Button variant="outlined" color="primary" onClick={async () => {
                  if (!code) return;
                  let preFormattedCode = preFormatCode(code);
                  let formattedCode = await formatCode(preFormattedCode);
                  setCode(formattedCode);

                  let warnings = runVerifiers(formattedCode);
                  setCurrentWarnings(warnings);
                }}>
                  Verify Code!
                </Button>
                <Button variant="outlined" color="primary" onClick={() => {
                  // A new tab with /api/v1/styleguide
                  window.open("/api/v1/styleguide", "_blank");
                }}>
                  Style guide
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} height="90vh">
          <CodeEditor value={code} onChange={code => setCode(code)} />
        </Grid>
        <Grid item xs={4} height="90vh" p={2}>
          {currentWarnings.length == 0 ?
            <CodeWarningOkay /> :
            currentWarnings.map((warning, index) => <CodeWarningComponent key={index}
              warning={warning} onDelete={() => {
                setCurrentWarnings(currentWarnings.filter(w => w !== warning));
              }} />)}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
