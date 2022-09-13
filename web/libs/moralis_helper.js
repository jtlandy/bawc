/**
 * 
cursor: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHhjMzM0MzEzODM4NWJhNWM4N2M1MzM2N2Q5YTUyMDNjMDg5MTU1OTBkIiwib3duZXJfb2YiOiIweGQ1NDM5ZjIxZmQ0NmYyZWE3NDU2MzQ0MzYyNmYwMjQ2ZTI2ODk4M2YifSwibGltaXQiOjEwMCwib2Zmc2V0IjowLCJvcmRlciI6W1sidHJhbnNmZXJfaW5kZXgiLCJERVNDIl1dLCJwYWdlIjoxLCJrZXkiOiIxMDg2NzQ5NC45LjEwLjAiLCJ0b3RhbCI6MiwiaWF0IjoxNjU2MDcyMDE1fQ.e5A7UJ986Jp_qPAI-mmkkL0CaFlaLOk3z58u9ngaWDc"
page: 0
page_size: 100
result: (2) [{…}, {…}]
status: "SYNCED"
total: 2


 result: Array(2)
0:
amount: "1"
block_number: "10867497"
block_number_minted: "10867182"
contract_type: "ERC721"
last_metadata_sync: null
last_token_uri_sync: "2022-06-22T18:06:04.874Z"
metadata: null
name: "Genesis Owner Key"
owner_of: "0xd5439f21fd46f2ea74563443626f0246e268983f"
symbol: "OWNK"
synced_at: null
token_address: "0xc3343138385ba5c87c53367d9a5203c08915590d"
token_hash: "4fecb1dde08dec9b31f6138d5e7b1b2a"
token_id: "1"
token_uri: "data:application/json;base64,eyJuYW1lIjogIkdlbmVzaXMgT3duZXI
 */

import {uritoJson, ipfsToHttp} from "./utils"

function parseNFT(data) {
    if(data.result.length == 0) return [];
    const  nfts = data.result;
    const ret = nfts.map(function(nft) {
        const token_uri = nft.token_uri;
        const json = uritoJson(token_uri);
        nft.metadata = json;
        nft.image = ipfsToHttp(json.image)
        return nft;
    });
    return ret;
}
module.exports = {
    parseNFT,   
}