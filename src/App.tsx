import { Button, Grid } from "@mui/material";
import { useState } from "react";
import CodeEditor from "./editor/CodeEditor";

function App() {
  let [code, setCode] = useState<string>();

  return (
    <Grid container>
      <Grid item xs={12} textAlign="center" fontSize="2em" height="10vh"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            Code Rule Verifier
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary">
              Verify Code!
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} height="90vh">
        <CodeEditor value={code} onChange={code => setCode(code)} />
      </Grid>
    </Grid>
  );
}

export default App;
