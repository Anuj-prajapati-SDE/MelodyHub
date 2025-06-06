const express = require('express');
const { protect, authorize } = require('../middleware/auth.js');
const fileUpload = require('express-fileupload');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllSongs,
  getSongById,
  uploadSong,
  updateSong,
  deleteSong,
  getDashboardStats,
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist
} = require('../controllers/adminController.js');

const router = express.Router();

// Use file upload middleware
router.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max file size
}));

// All routes in this file are protected and require admin access
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Song management routes
router.route('/songs')
  .get(getAllSongs)
  .post(uploadSong);

router.route('/songs/:id')
  .get(getSongById)
  .put(updateSong)
  .delete(deleteSong);

// Playlist management routes
router.route('/playlists')
  .get(getAllPlaylists)
  .post(createPlaylist);

router.route('/playlists/:id')
  .get(getPlaylistById)
  .put(updatePlaylist)
  .delete(deletePlaylist);

router.route('/playlists/:id/songs/:songId')
  .put(addSongToPlaylist)
  .delete(removeSongFromPlaylist);

// Dashboard statistics
router.get('/stats', getDashboardStats);

module.exports = router;