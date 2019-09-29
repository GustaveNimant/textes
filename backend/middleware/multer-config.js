const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, 'images'); /* where to save file */
  },

  filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      console.log('Dans multer-config.js.filename name', name);
      callback(null, name + Date.now() + '.' + extension); /* null : error */
  }
});

console.log('Dans multer-config.js Sortie');

module.exports = multer({storage: storage}).single('image'); /* single file */
