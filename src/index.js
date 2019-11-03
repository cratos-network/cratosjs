const fetch = require("node-fetch");
const bip39 = require('bip39');
const bip32 = require('bip32');
const bech32 = require('bech32');
const secp256k1 = require('secp256k1');
const crypto = require('crypto');
const bitcoinjs = require('bitcoinjs-lib');


class Cratos {
    constructor(url, chainId) {
        if (!this.url) {
            throw new Error("url object was not set or invalid");
        }
        if (!this.chainId) {
            throw new Error("chainId object was not set or invalid");
        }
        this.url = url;
        this.chainId = chainId;
        this.path = "m/44'/118'/0'/0/0";
        this.bech32MainPrefix = "cosmos";
    }

    getAccounts(address) {
        let accountsApi = "/auth/accounts/";
        return fetch(this.url + accountsApi + address)
            .then(response => response.json());
    }

    getAddress(mnemonic) {
        if (typeof mnemonic !== "string") {
            throw new Error("mnemonic expects a string");
        }
        const seed = bip39.mnemonicToSeed(mnemonic);
        const node = bip32.fromSeed(seed);
        const child = node.derivePath(this.path);
        const words = bech32.toWords(child.identifier);
        return bech32.encode(this.bech32MainPrefix, words);
    }

    getECPairPriv(mnemonic) {
        if (typeof mnemonic !== "string") {
            throw new Error("mnemonic expects a string");
        }
        const seed = bip39.mnemonicToSeed(mnemonic);
        const node = bip32.fromSeed(seed);
        const child = node.derivePath(this.path);
        const ecpair = bitcoinjs.ECPair.fromPrivateKey(child.privateKey, { compressed: false });
        return ecpair.privateKey;
    }

    broadcast(signedTx) {
        {
            let broadcastApi = "";
            if (this.chainId.indexOf("cosmoshub") != -1 ||
                this.chainId.indexOf("kava") != -1 ||
                this.chainId.indexOf("gaia") != -1) {
                broadcastApi = "/txs";
            } else if (this.chainId.indexOf("irishub") != -1) {
                broadcastApi = "/tx/broadcast";
            }

            return fetch(this.url + broadcastApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signedTx)
            })
                .then(response => response.json())
        }
    }

    sign(stdSignMsg, ecpairPriv, modeType = "sync") {
        // The supported return types includes "block"(return after tx commit), "sync"(return afer CheckTx) and "async"(return right away).
        let signMessage = new Object;
        if (stdSignMsg.json.msgs[0].type == "irishub/bank/Send" ||
            stdSignMsg.json.msgs[0].type == "irishub/stake/BeginUnbonding" ||
            stdSignMsg.json.msgs[0].type == "irishub/stake/BeginRedelegate") {
            signMessage = stdSignMsg.jsonForSigningIrisTx;
        } else {
            signMessage = stdSignMsg.json;
        }
        const hash = crypto.createHash('sha256').update(JSON.stringify(sortObject(signMessage))).digest('hex');
        const buf = Buffer.from(hash, 'hex');
        let signObj = secp256k1.sign(buf, ecpairPriv);
        var signatureBase64 = Buffer.from(signObj.signature, 'binary').toString('base64');
        let signedTx = new Object;
        if (this.chainId.indexOf("cosmoshub") != -1 ||
            this.chainId.indexOf("kava") != -1 ||
            this.chainId.indexOf("gaia") != -1) {
            signedTx = {
                "tx": {
                    "msg": stdSignMsg.json.msgs,
                    "fee": stdSignMsg.json.fee,
                    "signatures": [
                        {
                            "signature": signatureBase64,
                            "pub_key": {
                                "type": "tendermint/PubKeySecp256k1",
                                "value": getPubKeyBase64(ecpairPriv)
                            }
                        }
                    ],
                    "memo": stdSignMsg.json.memo
                },
                "mode": modeType
            }
        } else if (this.chainId.indexOf("irishub") != -1) {
            signedTx = {
                "tx": {
                    "msg": stdSignMsg.json.msgs,
                    "fee": stdSignMsg.json.fee,
                    "signatures": [
                        {
                            "signature": signatureBase64,
                            "account_number": stdSignMsg.json.account_number,
                            "sequence": stdSignMsg.json.sequence,
                            "pub_key": {
                                "type": "tendermint/PubKeySecp256k1",
                                "value": getPubKeyBase64(ecpairPriv)
                            }
                        }
                    ],
                    "memo": stdSignMsg.json.memo
                },
                "mode": modeType
            }
        }

        return signedTx;
    }
}


function network(url, chainId) {
    return new Cratos(url, chainId);
}

module.exports = {
    network: network
}