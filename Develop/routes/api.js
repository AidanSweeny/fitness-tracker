const router = require("express").Router();
const Workout = require("../models/workout.js");

router.put("/api/workouts/:id", (req, res) => {
    console.log("PUT: " + req.body.exercises)
    Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }
    )
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({body}, res) => {
    Workout.create(body)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})

router.get("/api/workouts/", ({ body }, res) => {
    Workout.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({ day: { $gte: req.query.start, $lte: req.query.end } })
    .then(result => {
        if(result === undefined){
            res.json({})
        }
        else{
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

module.exports = router;
