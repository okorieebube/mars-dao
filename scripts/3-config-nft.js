import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x71658E7e403A12383612bEa3418d15a2Ea2c08B3",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Mars Representative",
        description: "This NFT certifies that the holder is a verified representative of the Martian nation.",
        image: readFileSync("scripts/assets/mars-rep.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()