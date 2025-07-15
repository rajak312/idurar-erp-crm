const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Query');

const create = require('./create');
const remove = require('./delete');
const list = require('./paginatedList');
const read = require('./read');
const update = require('./update');
const addNote = require('./addNote');

methods.create = create;
methods.read = read;
methods.list = list;
methods.update = update;
methods.addNote = addNote;
methods.deleteNote = remove;

module.exports = methods;
