const router = require("express").Router();
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercise.js");

module.exports = function(app) {
app.put("/api/workouts/:id", (req, res) => {
    Exercise.create(req.body)
    .then((data) => 
    Workout.findOneAndUpdate({_id : req.params.id}, { $push: { exercises: data._id } }
    )
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json(err);
    })
    )
});

app.post("/api/workouts", ({body}, res) => {
    console.log(body);
    Workout.create(body)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})

app.get("/api/workouts/", ({ body }, res) => {
    Workout.find({})
    .populate("exercises")
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
    Workout.find({ day: { $gte: req.query.start, $lte: req.query.end } })
    .populate("exercises")
    .then(result => {
        if(result === undefined){
            res.json({})
        }
        else{
            console.log(result)
            res.json(result);
        }
    })
    .catch(err => {
      res.status(400).json(err);
    });

    router.delete("/api/workouts", ({ body }, res) => {
        Workout.findByIdAndDelete(body.id)
          .then(() => {
            res.json(true);
          })
          .catch(err => {
            res.json(err);
          });
      });
});
}

