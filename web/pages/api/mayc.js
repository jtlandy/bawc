
import axios from 'axios';

export default async function handler(req, res) {
    const {tokenId } = req.body;
    const url = `https://boredapeyachtclub.com/api/mutants/` + tokenId.toString();
    const response = await axios.get(url);
    res.status(200).end(JSON.stringify(response.data));
}