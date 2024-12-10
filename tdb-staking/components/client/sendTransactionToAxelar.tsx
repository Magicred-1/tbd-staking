import { Client, Transaction, Wallet } from "xrpl";

// Connect to XRPL and submit a payment transaction
export const submitTransaction = async (xrplAddress: string, destinationAddress: string, payloadHash: string, amount: string) : Promise<{ success: boolean, hash?: string, message?: string }> => {
  const client = new Client("wss://s.altnet.rippletest.net:51233"); // XRPL testnet
  try {
    await client.connect();

    // Replace with your XRPL secret (store securely in production)
    const wallet = Wallet.fromSeed("YOUR_XRPL_SECRET");

    // Build the transaction
    const transaction: Transaction = {
      TransactionType: "Payment",
      Account: xrplAddress,
      Amount: amount,
      Destination: "rP9iHnCmJcVPtzCwYJjU1fryC2pEcVqDHv", // Axelar Multisig
      Memos: [
        {
            // Destination address on XRPL EVM Sidechain
            Memo: {
                MemoData: destinationAddress, // your ETH recipient address, without the 0x prefix
                MemoType: "64657374696E6174696F6E5F61646472657373", // hex("destination_address")
            },
        },
        {
            Memo: {
                MemoData: "7872706C2D65766D2D73696465636861696E", // hex("xrpl-evm-sidechain")
                MemoType: "64657374696E6174696F6E5F636861696E", // hex("destination_chain")
            },
        },
        {
            Memo: {
                MemoData: payloadHash,  // The hash of the payload you want to call on XRPL EVM Sidechain
                MemoType: "7061796C6F61645F68617368", // hex("payload_hash")
            },
        },
    ],
    };

    // Autofill, sign, and submit the transaction
    const prepared = await client.autofill(transaction);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    if (result.status === "tesSUCCESS") {
      return { success: true, hash: result.result.hash };
    } else {
      return { success: false, message: "Transaction failed" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: `Transaction failed: ${error}` };
  } finally {
    client.disconnect();
  }
};

// Encode a string into hex
export const toHex = (string: string) => Buffer.from(string, "utf8").toString("hex");
