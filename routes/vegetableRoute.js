// Load express
const express = require('express')

// Create a special router object for our routes
const router = express.Router()

// Loading our Model of vegetable
const vegetable = require('../models/vegetable')

// Bring in seed data
const seed = require('../models/seed')

// Bring in controller functions (destructure methods)
const { 
    findAllvegetables, 
    showNewView, 
    createNewvegetable,
    seedStarterData,
    showOnevegetable,
    showEditView,
    updateOnevegetable,
    deleteOnevegetable
} = require('../controllers/vegetableController')

// Bring in controller object (with methods attached)
// const vegetableController = require('../controllers/vegetableController')
// Example: router.get('/', vegetableController.findAllvegetables)


// I.N.D.U.C.E.S
// Index, New, Delete, Update, Create, Edit, Show

// Setup "index" route
router.get('/', findAllvegetables)

// Setup "new" route
router.get('/new', showNewView)

// Setup "destroy" route
router.delete('/:id', deleteOnevegetable)

// Setup "update" route
router.put('/:id', updateOnevegetable)

// Setup "create" route
router.post('/', createNewvegetable)

// Setup "edit" route
router.get('/:id/edit', showEditView)

// Setup "show" route  
router.get('/:id', showOnevegetable)

// Setup "seed" route
router.get('/seed', seedStarterData)


module.exports = router
