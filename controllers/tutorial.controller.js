const db = require('../models');
const Tutorial = db.tutorials;

//Creates a tutorial.
exports.create = (req, res) => {
    //Validate request
    if(!req.body.title){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    //Create a tutorial.
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false 
    });

    //Save tutorial in the database.
    tutorial.save(tutorial).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message: err.message || "Error occured while creating a tutorial."});
    });
}

//Finds all tutorials from database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tutorial.find(condition)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving tutorials."
        })
    })
};

//Finds one tutorial.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: "Tutorial with id " + id + " could not be found."});
        }else{
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving tutorial with id " + id});
    })
};

//Updates a tutorial.
exports.update = (req, res) => {
    if(!req.body){
        res.status(404).send({
            message: "Data to update cannot be empty."
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({
                message: "Cannot update tutorial with id " + id + " .Tutorial not found." 
            });
        }
        else{
            res.send({message: "Tutorial was successfully updated."})
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating tutorial with id " + id
        });
    });
};

//Deletes a single/One tutorial.
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if(!data){
            res.status(404).send({
                message: "Cannot delete tutorial with id " + id
            })
        }else{
            res.send({
                message: "Tutorial successfully deleted."
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error while deleting tutorial with id " + id
        });
    });
};

//Deletes all tutorials.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Tutorials were successfully deleted.`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured when deleting all tutorials."
        });
    });
};

//Finds all published tutorials.
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while all retrieving tutorials."
        });
    });
};
