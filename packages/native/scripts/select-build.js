import { execSync } from "child_process";
import os from "os";

const args = process.argv.slice(2).join(" ");

let platform = "nix";
if (os.platform() === "win32") {
  platform = "win";
}
execSync(`npm run build:${platform} -- ${args}`, { stdio: "inherit" });

