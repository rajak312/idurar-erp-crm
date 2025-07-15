const express = require('express');
const { catchErrors } = require('@/handlers/errorHandlers');
const {
  create,
  remove,
  list,
  read,
  update,
  addNote,
} = require('@/controllers/appControllers/queryController');
const router = express.Router();

router.get('/queries', catchErrors(list));
router.post('/queries', catchErrors(create));
router.get('/queries/:id', catchErrors(read));
router.put('/queries/:id', catchErrors(update));
router.post('/queries/:id/notes', addNote);
router.delete('/queries/:id/notes/:noteId', catchErrors(remove));

module.exports = router;
