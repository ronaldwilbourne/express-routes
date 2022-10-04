// Load express
const express = require('express')

// Create a special router object for our routes
const router = express.Router()

// Loading our Model of meat
const meat = require('../models/meat')

// Bring in seed data
const seed = require('../models/seed')

// Bring in controller functions (destructure methods)
const { 
    findAllmeats, 
    showNewView, 
    createNewmeat,
    seedStarterData,
    showOnemeat,
    showEditView,
    updateOnemeat,
    deleteOnemeat
} = require('../controllers/meatController')

// Bring in controller object (with methods attached)
// const meatController = require('../controllers/meatController')
// Example: router.get('/', meatController.findAllmeats)


// I.N.D.U.C.E.S
// Index, New, Delete, Update, Create, Edit, Show

// Setup "index" route
router.get('/', findAllmeats)

// Setup "new" route
router.get('/new', showNewView)

// Setup "destroy" route
router.delete('/:id', deleteOnemeat)

// Setup "update" route
router.put('/:id', updateOnemeat)

// Setup "create" route
router.post('/', createNewmeat)

// Setup "edit" route
router.get('/:id/edit', showEditView)

// Setup "show" route  
router.get('/:id', showOnemeat)

// Setup "seed" route
router.get('/seed', seedStarterData)


module.exports = router
