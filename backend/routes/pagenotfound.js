const express = require('express');
const router = express.Router();
const pagenotfound = require('../controllers/error')
router.get(pagenotfound.get404)

module.export =  router