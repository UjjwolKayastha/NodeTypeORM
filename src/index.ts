import dotenv from "dotenv";
import express from "express";

import "reflect-metadata";

import { createConnection, Connection } from "typeorm";
import { Photo } from "./entity/Photo";
import bodyParser from "body-parser";

// initialize configuration
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080; // default port to listen

let dbCon: Connection;

const getConnection = async () => {
  dbCon = await createConnection();
};

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get("/photo", async (req, res) => {
  const photoRepo = dbCon.getRepository(Photo);
  const photos = await photoRepo.find();
  res.json(photos);
});

app.get("/photo/:id", async (req, res) => {
    const id = req.params.id;
    const photoRepo = dbCon.getRepository(Photo);
    try {
      const photo = await photoRepo.findOne(id);
      res.json(photo);
    } catch (e) {
      res.json({
        message: "Couldn't find photo.",
        error: e,
      });
    }
  });

app.post("/photo", async (req, res) => {
    const photoRepo = dbCon.getRepository(Photo);
    const photo = req.body as Photo;
    try {
      await photoRepo.insert(photo);
      res.json({
        message: "Photo saved",
      });
    } catch (e) {
      res.json({
        message: "Couldn't save photo",
        error: e,
      });
    }
  });


app.put("/photo/:id", async (req, res) => {
  const photoRepo = dbCon.getRepository(Photo);
  try {
    const photo = new Photo(req.body);
    photo.id = Number(req.params.id);
    await photoRepo.save(photo);
    res.json({
      message: "Update Success",
    });
  } catch (e) {
    res.json({
      message: "Update Failed",
      error: e,
    });
  }
});

app.delete("/photo/:id", async (req, res) => {
  const photoRepo = dbCon.getRepository(Photo);
  const id = req.params.id;
  try {
    const photo = await photoRepo.findOne(id);
    await photoRepo.remove(photo);
    res.json({
      message: "Photo deleted.",
      photo,
    });
  } catch (e) {
    res.json({
      message: "Delete Failed",
      error: e,
    });
  }
});



// start the Express server
app.listen(port, async () => {
  try {
    await getConnection();
  } catch (e) {
    console.log("Couldn't Connect to database.", e);
  }
 // tslint:disable-next-line:no-console
 console.log( `server started at http://localhost:${ port }` );
});

