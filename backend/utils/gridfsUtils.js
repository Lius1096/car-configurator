const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

// Initialisation GridFS
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads'); // nom de la collection
});

// Suppression fichier
async function deleteFile(fileId) {
  return new Promise((resolve, reject) => {
    if (!gfs) {
      return reject(new Error("GridFS not initialized yet"));
    }

    gfs.remove({ _id: new mongoose.Types.ObjectId(fileId), root: 'uploads' }, (err) => {
      if (err) return reject(err);
      resolve({ message: "File deleted successfully" });
    });
  });
}

module.exports = deleteFile;
