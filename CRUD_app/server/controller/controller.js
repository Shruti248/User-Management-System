// Model(schema) is required
var Userdb = require("../model/model");

// Create & Save new User
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  console.log(req.file);
  //new user
  const user = new Userdb({
    //'ll give value to the schema made(model)
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
    image: req.file.filename
  });

  //Save user in the database
  user
    .save(user) //save the value to the database
    .then((data) => {
      //return the saved data
      // res.send(data)
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while creating a create operation ",
      });
    });
};

//retrieve & return all or single users
exports.find = (req, res) => {
  //find single user , we use query parameter
  //If not , then we find all the users in else block

  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not Found User with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id " + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || " Error Occured while retrieving user information",
          });
      });
  }
};

//Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to be updated cannot be empty" });
  }

  //Using params we get id from the url to be updated
  const id = req.params.id;

  Userdb.findByIdAndUpdate(id, req.body, { userFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .send(404)
          .send({
            message: `Cannot Update User with ${id}. Maybe User not Found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update Information" });
    });
};

//Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot delete with id : ${id}. Maybe id is wrong`,
          });
      } else {
        res.send({
          message: "User was deleted Successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete User with id = " + id,
      });
    });
};

exports.uploadImage = (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("imagesPage", { items: items });
    }
  });
};
