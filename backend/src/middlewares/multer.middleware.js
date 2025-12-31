import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/documents");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const imageUpload = multer({ storage: imageStorage });
const documentUpload = multer({ storage: documentStorage });

export { imageUpload, documentUpload };
