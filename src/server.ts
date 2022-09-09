import express from 'express';
import {Application, Request, Response, NextFunction, Errback} from "express";
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Console } from 'console';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get( "/filteredimage", async (req: Request, res: Response) => {
    try {
      let filteredpath: string = await filterImageFromURL(req.query.image_url as string);
      res.status(200).sendFile(filteredpath,()=>{deleteLocalFiles([filteredpath])});
    }
    catch (error) {
      console.log(error);
      res.status(400).send("Invalid URL");
    }
  } );
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();