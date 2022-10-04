const meat = require('../models/meat')

// ROUTE     GET /meats    (index)
const findAllmeats = (req, res) => {  
    // Find takes two arguments:
    //   1st: an object with our query (to filter our data and find exactly what we need)
    //   2nd: callback (with an error object and the found data)
    meat.find({}, (err, foundmeat) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('meats/Index', { meats: foundmeat })
        }
    })
}

// ROUTE      GET /meats/new    (new)
const showNewView = (req, res) => {     
    // res.send('<form>Create meat</form>')
    res.render('meats/New')
}

// ROUTE     POST /meats     (create)
const createNewmeat = (req, res) => {
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    // Create has two arguments:
    //   1st: the data we want to send
    //   2nd: callback function 
    meat.create(req.body, (err, createdmeat) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect('/meats')
        }
    })
}


// ROUTE       GET /meats/seed      (seed)
const seedStarterData = (req, res) => {
    // Delete all remaining documents (if there are any)
    meat.deleteMany({}, (err, deletedmeats) => {
        if (err) {
            res.status(400).json(err)
        } else {
            console.log('deleted data.')
            console.log(seed.meats)
            // Data has been successfully deleted
            // Now use seed data to repopulate the database
            meat.create(seed.meats, (err, createdmeat) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(200).redirect('/meats')
                }
            })
        }
    })
}

// ROUTE     GET /meats/:id     (show)
const showOnemeat = (req, res) => {
    // findById accepts two arguments:
    //   1st: the id of the document in our database
    //   2nd: callback (with error object and found document)
    meat.findById(req.params.id, (err, foundmeat) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('meats/Show', { meat: foundmeat })
        }
    })
}


// ROUTE      GET /meats/:id/edit     (edit)
const showEditView = (req, res) => {
    meat.findById(req.params.id, (err, foundmeat) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('meats/Edit', { meat: foundmeat })
        }
    })
}

// ROUTE     PUT /meats/:id       (update)
const updateOnemeat = (req, res) => {

    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }

    // findByIdAndUpdate takes 4 arguments:
    //    1st: the id 
    //    2nd: new data we want to use to update the old document
    //    3rd (optional): an options object, which looks like this:  { new: true }
    //    4th: callback (with error object and foundmeat or updatedmeat)
    meat.findByIdAndUpdate(req.params.id, req.body, (err, foundmeat) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect(`/meats/${req.params.id}`)
        }
    })
}


// ROUTE       DELETE /meats/:id      (destroy)
const deleteOnemeat = (req, res) => {
    // console.log('in delete route')
    // res.send('Deleting a meat at index! (in DB)')
    
    meat.findByIdAndDelete(req.params.id, (err, deletedmeat) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect('/meats')
        }
    })
}

module.exports = {
    findAllmeats,
    showNewView, 
    createNewmeat,
    seedStarterData,
    showOnemeat,
    showEditView,
    updateOnemeat,
    deleteOnemeat
}