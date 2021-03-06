import { Config } from "./types";
import { config as baseConfig } from "./config.base";
import { config as devConfig } from "./config.dev";
import { config as testConfig } from "./config.jest";
import { config as prodConfig } from "./config.prod";

// CONFIG_TYPE is configured by webpack.DefinePlugin
declare const CONFIG_TYPE: "dev" | "jest" | "prod";

export let config: Config;
if (CONFIG_TYPE === "dev") {
  config = Object.assign(baseConfig, devConfig);
} else if (CONFIG_TYPE === "jest") {
  config = Object.assign(baseConfig, testConfig);
} else if (CONFIG_TYPE === "prod") {
  config = Object.assign(baseConfig, prodConfig);
}
