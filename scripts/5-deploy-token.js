import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0xDd265022C3497DE95de1f191aC94c5d4F1904613");
// token address: 0x147644b9f451ec45dcc234cc9f4f2d07efab7fbf
(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: "Martian",
      // What's your token's symbol? Ex. "ETH"
      symbol: "MARTIAN",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();