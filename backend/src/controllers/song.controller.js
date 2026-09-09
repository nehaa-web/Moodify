const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {

    console.log("FILES:", req.files);
const SongFile = req.files.find(f => f.fieldname.trim() === "song");
const PosterFile = req.files.find(f => f.fieldname.trim() === "poster");

const songBuffer = SongFile.buffer;
const posterBuffer = PosterFile.buffer;

  const { mood } = req.body;

  const tags = id3.read(songBuffer);

  const title = tags.title || "song";

  const [songFile, posterFile] = await Promise.all([

    storageService.uploadFile({
      buffer: songBuffer,
        filename: `${title}.mp3`,
      folder: "/moodify/songs",
    }),

    storageService.uploadFile({
      buffer: posterBuffer,
        filename: `${title}.jpg`,
      folder: "/moodify/songs",
    }),``
  ]);

  const song = await songModel.create({
    title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "song create succesfully",
    song,
  });
}

async function getSong(req , res){

  const { mood } = req.query

  const song = await songModel.findOne({
    mood
  })

  res.status(200).json({
    message: "song fetched succesfully",
    song
  })
}

module.exports = {
  uploadSong,
  getSong
};
