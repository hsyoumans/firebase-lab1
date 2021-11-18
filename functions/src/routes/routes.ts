import express from"express";
import { ObjectId, OptionalId } from "mongodb";
import { getClient } from "../db/db";
import Shout from "../models/models";

// create a new Router object
const routes = express.Router();
routes.get("/shoutout", async (req, res) => {
    try {
        const client = await getClient();
        const results = await client.db()
            .collection<Shout>('firelab1')
            .find().toArray();
        res.json(results); // send JSON results
    } catch(error) {
        res.status(500).json({message: "Internal Server Error"});
    }
  });

routes.get("/shoutout/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const client = await getClient();
      const shout = await client.db().collection<Shout>('firelab1')
        .findOne({_id: new ObjectId(id)});
      if (shout) {
        res.json(shout);
      } else {
        res.status(404).json({message: "Not Found"});
      }
    } catch (error) { 
        res.status(500);
    }
});

  routes.post("/shoutout", async (req, res) => {
    const shout = req.body as OptionalId<Shout>;
    try {
      const client = await getClient();
      await client.db()
          .collection<Shout>('firelab1')
          .insertOne(shout);
      res.status(201).json(shout);
    } catch (error) { 
      res.status(500);
    }
  });

  routes.delete("/shoutout/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db().collection<Shout>('firelab1')
             .deleteOne({_id: new ObjectId(id)});
      if (result.deletedCount === 0) {
        res.status(404).json({message: "Not Found"});
      } else {
        res.status(204).end();
      }
    } catch (error) { 
      res.status(500);
    }
  });
   
  routes.put("/shoutout/:id", async (req, res) => {
    const id = req.params.id;
    const shout = req.body as OptionalId<Shout>;
    try {
      const client = await getClient();
      const results = await client.db("test").collection("firelab1")
       .replaceOne({_id: new ObjectId(id)}, shout);
   
     if(results.modifiedCount === 0 ) {
       res.status(404)
     }
     else {
       res.send(200);
     }
    } catch (err) {   
      res.status(500);
    }
  });
    
   
  
export default routes;