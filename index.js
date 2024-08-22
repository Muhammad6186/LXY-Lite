const { spawn } = require("child_process");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

function startBotProcess(script) {
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", script], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        console.log(`${script} process exited with code: ${codeExit}`);
        if (codeExit !== 0) {
            setTimeout(() => startBotProcess(script), 3000);
        }
    });

    child.on("error", (error) => {
        console.error(`An error occurred starting the ${script} process: ${error}`);
    });
}

startBotProcess("main.js");

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
