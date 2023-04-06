const express = require('express');
const router = express.Router();

// Controller
const { create,list,read,update,remove } = require('../Controller/NC_moni')


//End point
router.post('/ncmoni',create)
router.get('/ncmoni',list)
router.get('/ncmoni/:id',read)
router.put('/ncmoni/:id',update)
router.delete('/ncmoni/:id',remove)


module.exports = router