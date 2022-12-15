/**
 *               AppServer Class
 * Require Modules to setup the REST Api
 * - `express` Express.js is a Web Framework
 * - `morgan` Isn't required but help with debugging and logging
 * - `body-parser` This module allows to parse the body of the post request into a JSON
 */
 const express = require("express");
 const morgan = require("morgan");
 const bodyParser = require("body-parser");
 /**
  * Require the Blockchain class. This allow us to have only one instance of the class.
  */
 const ETHModel = require('./ethmodel/model.js');
 const ETHController = require('./ethcontroller/controller.js');
 
 class AppServer {
 
     constructor() {
         //Express application object
         this.app = express();
         //Blockchain Model class object
         this.model = new ETHModel.ETHModel();
         //Method that initialized the express framework.
         this.initExpress();
         //Method that initialized REST API middleware modules
         this.initRESTAPILayer();
         //Method that initialized the REST API controllers where you defined the REST endpoints
         this.initControllers();
         //Method that run the BlockChain REST API express application.
         this.start();
     }
 
     initExpress() {
         this.app.set("port", 8000);
     }
 
     initRESTAPILayer() {
         this.app.use(morgan("dev"));
         this.app.use(bodyParser.urlencoded({extended:true}));
         this.app.use(bodyParser.json());
     }
 
     initControllers() {
         console.log("controller initiated")	;
         require("./ethcontroller/controller.js")(this.app, this.model);
         
     }
 
     start() {
         let self = this;
         this.app.listen(this.app.get("port"), () => {
             console.log(`Server Listening for port: ${self.app.get("port")}`);
         });
     }
 
 }
 
 new AppServer();