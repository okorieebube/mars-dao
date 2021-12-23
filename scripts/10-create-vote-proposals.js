import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0x92F7d2213A54465fAddcAc0Ed65e42f4E7445021"
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x147644b9f451ec45dcc234cc9f4f2d07efab7fbf"
);

(async () => {
    try {
      const amount = 10000;
      await tokenModule.delegateTo(process.env.WALLET_ADDRESS);
      await voteModule.propose(
        `Should the DAO mint an additional ${amount} tokens into the treasury?`,
        [
          {
            nativeTokenValue: 0,
            transactionData: await tokenModule.contract.interface.encodeFunctionData(
              "mint",
              [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
            ),
            toAddress: tokenModule.address,
          },
        ]
      );
      console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
      console.error("failed to create first proposal", error);
      process.exit(1);
    }
  
  try {
    await tokenModule.delegateTo(process.env.WALLET_ADDRESS);
    const amount = 6_900;
    // Create proposal to transfer ourselves 6,900 token for being awesome.
    await voteModule.propose(
      "Should the DAO transfer " +
        amount +
        " tokens from the treasury to " +
        process.env.WALLET_ADDRESS +
        " for being awesome?",
      [
        {
          // Again, we're sending ourselves 0 ETH. Just sending our own token.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a transfer from the treasury to our wallet.
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
          //   gasLimit:300000,
        },
      ]
    );

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create first proposal", error);
  }
  
})();
