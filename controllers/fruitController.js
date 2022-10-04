const Fruit = require('../models/fruit')

// ROUTE     GET /fruits    (index)
const findAllFruits = (req, res) => {  
    // Find takes two arguments:
    //   1st: an object with our query (to filter our data and find exactly what we need)
    //   2nd: callback (with an error object and the found data)
    Fruit.find({}, (err, foundFruit) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('fruits/Index', { fruits: foundFruit })
        }
    })
}

// ROUTE      GET /fruits/new    (new)
const showNewView = (req, res) => {     
    // res.send('<form>Create fruit</form>')
    res.render('fruits/New')
}

// ROUTE     POST /fruits     (create)
const createNewFruit = (req, res) => {
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    // Create has two arguments:
    //   1st: the data we want to send
    //   2nd: callback function 
    Fruit.create(req.body, (err, createdFruit) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect('/fruits')
        }
    })
}


// ROUTE       GET /fruits/seed      (seed)
const seedStarterData = (req, res) => {
    // Delete all remaining documents (if there are any)
    Fruit.deleteMany({}, (err, deletedFruits) => {
        if (err) {
            res.status(400).json(err)
        } else {
            console.log('deleted data.')
            console.log(seed.fruits)
            // Data has been successfully deleted
            // Now use seed data to repopulate the database
            Fruit.create(seed.fruits, (err, createdFruit) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(200).redirect('/fruits')
                }
            })
        }
    })
}

// ROUTE     GET /fruits/:id     (show)
const showOneFruit = (req, res) => {
    // findById accepts two arguments:
    //   1st: the id of the document in our database
    //   2nd: callback (with error object and found document)
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('fruits/Show', { fruit: foundFruit })
        }
    })
}


// ROUTE      GET /fruits/:id/edit     (edit)
const showEditView = (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('fruits/Edit', { fruit: foundFruit })
        }
    })
}

// ROUTE     PUT /fruits/:id       (update)
const updateOneFruit = (req, res) => {

    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }

    // findByIdAndUpdate takes 4 arguments:
    //    1st: the id 
    //    2nd: new data we want to use to update the old document
    //    3rd (optional): an options object, which looks like this:  { new: true }
    //    4th: callback (with error object and foundFruit or updatedFruit)
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, foundFruit) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect(`/fruits/${req.params.id}`)
        }
    })
}


// ROUTE       DELETE /fruits/:id      (destroy)
const deleteOneFruit = (req, res) => {
    // console.log('in delete route')
    // res.send('Deleting a fruit at index! (in DB)')
    
    Fruit.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect('/fruits')
        }
    })
}

module.exports = {
    findAllFruits,
    showNewView, 
    createNewFruit,
    seedStarterData,
    showOneFruit,
    showEditView,
    updateOneFruit,
    deleteOneFruit
}