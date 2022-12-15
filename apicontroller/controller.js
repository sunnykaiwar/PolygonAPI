class Controller {

    //The constructor receive the instance of the express.js app and the Blockchain class
    constructor(app, modelObj) {
        this.app = app;
        this.model = modelObj;
        // All the endpoints methods needs to be called in the constructor to initialize the route.
        this.senSigddTrx();

    }

    // Endpoint that allow Submit a signed transaction
    senSigddTrx() {
        this.app.post("/sendsigtrx", async (req, res) => {
            if (req.body.rpcurl && req.body.sendingAddress && req.body.nonce && req.body.nonce && req.body.receivingAddress && req.body.gasPrice && req.body.gasLimit && req.body.value && req.body.data && req.body.privateKeySender) {
                const rpcurl = req.body.rpcurl
                const sendingAddress = req.body.sendingAddress
                const nonce = req.body.nonce
                const receivingAddress = req.body.receivingAddress
                const gasPrice = req.body.gasPrice
                const gasLimit = req.body.gasLimit
                const value = req.body.value
                const data = req.body.data
                const privateKeySender = req.body.privateKeySender
                //console.log(`rpcurl ===== ${rpcurl}`)
                //console.log(req.body)

                try {
                    
                    let block = await this.model.submitTrx(rpcurl, sendingAddress, nonce, receivingAddress, gasLimit, gasPrice, value, data, privateKeySender);
                    if (block) {
                        return res.status(200).json(block);
                    } else {
                        return res.status(500).send("An error happened!");
                    }
                } catch (error) {
                    return res.status(500).send(error);
                }
            } else {
                return res.status(500).send("Check the Body Parameter!");
            }
        });
    }

    
}
module.exports = (app, blockchainObj) => { return new Controller(app, blockchainObj); }