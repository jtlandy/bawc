const uritoJson = (uri) => {
    // 29 = length of "data:application/json;base64,"
    const json = atob(uri.substring(29));
    const result = JSON.parse(json);
    return result;
}
const hasValues = (obj) => Object.values(obj).some(v => v !== null && typeof v !== "undefined")
const ipfsToHttp = (ipfsURI) => {
    console.log("process.env.NEXT_PUBLIC_HTTPS_CONNECTION: ", process.env.NEXT_PUBLIC_HTTPS_CONNECTION)
    const url = null;
    if (ipfsURI.startsWith("ipfs://"))
        url = `https://ipfs.io/ipfs/${ipfsURI.split("ipfs://")[1]}`;
    else {
        if(process.env.NEXT_PUBLIC_HTTPS_CONNECTION == 1)
            url = ipfsURI;
        else
            //url = "https://cors-anywhere.herokuapp.com/" + ipfsURI;
            url = ipfsURI;
    } 
    return url;
}
export {
    uritoJson,
    hasValues,
    ipfsToHttp,
}