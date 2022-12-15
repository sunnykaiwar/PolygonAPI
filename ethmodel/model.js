class ETHModel {

    constructor() {


    }


    submitTrx(rpcurl, sendingAddress, nonce, receivingAddress, gasLimit, gasPrice, value, data, privateKeySender) {

        //console.log(`model: rpcurl ===== ${rpcurl}`)
        /*##########################
    
        CONFIGURATION
        ##########################*/
        // -- Step 1: Set up the appropriate configuration
        var Web3 = require("web3")
        var EthereumTransaction = require("ethereumjs-tx")
        var Tx = require('@ethereumjs/tx').Transaction;
        var web3 = new Web3(rpcurl)

        /*##########################
    
        CREATE A TRANSACTION
        ##########################*/

        // -- Step 4: Set up the transaction using the transaction variables as shown 
        //var rawTransaction = { nonce: nonce, to: receivingAddress, gasPrice: gasPrice, gasLimit: gasLimit, value: value, data: web3.utils.toHex(data), }
        //console.log(`rawTransaction nonce ${rawTransaction.nonce}`)


        /*Sign the Transaction
        ##########################*/

        // -- Step 7: Sign the transaction with the Hex value of the private key of the sender
        var privateKeySenderHex = Buffer.from(privateKeySender, "hex")
        console.log(`privateKeySenderHex ${privateKeySenderHex}`)
        console.log(`newNonce  ${nonce}`)
        //var gasLimit = web3.utils.toHex(gasLimit)
        var rawTx = {
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: web3.utils.toHex(receivingAddress),
            value: web3.utils.toHex(value),
            data: web3.utils.toHex(data)
        }
        console.log(` transaction ${rawTx}`)


        /*#########################################
    
            Send the transaction to the network
            #########################################*/
        const customPromise = new Promise((resolve, reject) => {
            try {
                console.log("entering try block")

                // var tx = new Tx(rawTx, {'chain':'ropsten'});
                var tx = new Tx(rawTx);
                console.log(`encoded transaction ${tx}`)
                var signedTx = tx.sign(privateKeySenderHex);
                console.log(`signedTx transaction ${signedTx}`)
                var serializedTx = signedTx.serialize();
                console.log(serializedTx.toString('hex'));
                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
                resolve(true)
                console.log("leaving try block")
            }
            catch (e) {
                console.log("entering catch block");
                console.log(e);
                console.log("leaving catch block");
                reject(false)
            }

        })

        return customPromise
    }
}

module.exports.ETHModel = ETHModel; 