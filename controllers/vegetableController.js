const vegetable = require('../models/vegetable')

// ROUTE     GET /vegetables    (index)
const findAllvegetables = (req, res) => {  
    // Find takes two arguments:
    //   1st: an object with our query (to filter our data and find exactly what we need)
    //   2nd: callback (with an error object and the found data)
    vegetable.find({}, (err, foundvegetable) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('vegetables/Index', { vegetable: foundvegetable })
        }
    })
}

// ROUTE      GET /vegetables/new    (new)
const showNewView = (req, res) => {     
    // res.send('<form>Create vegetable</form>')
    res.render('vegetables/New')
}

// ROUTE     POST /vegetables     (create)
const createNewvegetable = (req, res) => {
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    // Create has two arguments:
    //   1st: the data we want to send
    //   2nd: callback function 
    vegetable.create(req.body, (err, createdvegetable) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect('/vegetables')
        }
    })
}


// ROUTE       GET /vegetables/seed      (seed)
const seedStarterData = (req, res) => {
    // Delete all remaining documents (if there are any)
    vegetable.deleteMany({}, (err, deletedvegetables) => {
        if (err) {
            res.status(400).json(err)
        } else {
            console.log('deleted data.')
            console.log(seed.vegetable)
            // Data has been successfully deleted
            // Now use seed data to repopulate the database
            vegetable.create(seed.vegetable, (err, createdvegetable) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(200).redirect('/vegetables')
                }
            })
        }
    })
}

// ROUTE     GET /vegetables/:id     (show)
const showOnevegetable = (req, res) => {
    // findById accepts two arguments:
    //   1st: the id of the document in our database
    //   2nd: callback (with error object and found document)
    vegetable.findById(req.params.id, (err, foundvegetable) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('vegetables/Show', { vegetable: foundvegetable })
        }
    })
}


// ROUTE      GET /vegetables/:id/edit     (edit)
const showEditView = (req, res) => {
    vegetable.findById(req.params.id, (err, foundvegetable) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).render('vegetables/Edit', { vegetable: foundvegetable })
        }
    })
}

// ROUTE     PUT /vegetables/:id       (update)
const updateOnevegetable = (req, res) => {

    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }

    // findByIdAndUpdate takes 4 arguments:
    //    1st: the id 
    //    2nd: new data we want to use to update the old document
    //    3rd (optional): an options object, which looks like this:  { new: true }
    //    4th: callback (with error object and foundvegetable or updatedvegetable)
    vegetable.findByIdAndUpdate(req.params.id, req.body, (err, foundvegetable) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect(`/vegetables/${req.params.id}`)
        }
    })
}


// ROUTE       DELETE /vegetables/:id      (destroy)
const deleteOnevegetable = (req, res) => {
    // console.log('in delete route')
    // res.send('Deleting a vegetable at index! (in DB)')
    
    vegetable.findByIdAndDelete(req.params.id, (err, deletedvegetable) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).redirect('/vegetables')
        }
    })
}

module.exports = {
    findAllvegetables,
    showNewView, 
    createNewvegetable,
    seedStarterData,
    showOnevegetable,
    showEditView,
    updateOnevegetable,
    deleteOnevegetable
}