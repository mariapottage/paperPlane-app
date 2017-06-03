const express = require('express');
const ensure  = require('connect-ensure-login');
const multer  = require('multer');
const path    = require('path');

const Room    = require('../models/room-model.js');

const router  = express.Router();


router.get('/rooms/new',
  //We need to be logged in to create new rooms
ensure.ensureLoggedIn('/login'),

(req, res, next) => {
  res.render('notes/new-room-view.ejs', {
    layout:"layouts/layout-home"
  });
}
);

const myUploader = multer({
  dest: path.join(__dirname, '../public/uploads')
});

// form method post
router.post('/notes',
//we need to be logged in to create rooms
  ensure.ensureLoggedIn('/login'),

  //inut type="file" name="roomPhoto"

  myUploader.single('roomPhoto'),

  (req, res, next) => {
    console.log('');
    console.log('req.file --------------');
    console.log('req.file');
    console.log(' ');

    const theRoom = new Room({
      name: req.body.roomName,
      description: req.body.roomDescription,
      photoAddress: `/uploads/${req.file.filename}`,
      owner: req.user._id
    });

theRoom.save((err)=> {
  if(err) {
    next(err);
    return;
  }
  req.flash('success', 'Your room was saved successfully');

  res.redirect('/notes');
});
  }
);


router.get('/notes', ensure.ensureLoggedIn(),
(req, res, next) => {
  Room.find(
    { owner: req.user._id },
    (err, roomsList) => {
      if (err) {
        next(err);
        return;
  }

      // if (roomsList.length > 0) {

      res.render('notes/rooms-list-view.ejs', {
        layout:"layouts/layout-home",
        rooms: roomsList,
        successMessage: req.flash('success')
      });
    }
  );
}
);

module.exports = router;
