// https://api.diadata.org/v1/assetQuotation/Ripple/0x0000000000000000000000000000000000000000
"use server"


export async function fetchXRPPrice() {
    const response = await fetch(`https://api.diadata.org/v1/assetQuotation/Ripple/0x0000000000000000000000000000000000000000`)
    const data = await response.json()
    return data.Price;
}

export async function fetchATOMPrice() {
    const response = await fetch(`https://api.diadata.org/v1/assetQuotation/Cosmos/0x0000000000000000000000000000000000000000`)
    const data = await response.json()
    return data.Price;
}

