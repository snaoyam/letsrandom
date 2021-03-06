const express = require("express");
const db = require("./db_category");
const router  = express.Router();

router.get("/", (req, res) => {
  db.getAll((items) => {
    res.json(items);
  });
});

router.put("/", (req, res) => {
  const {id} = req.body;
  db.incpicked(id, () => {
    res.status(200).json({"msg": "success!"});
  });
})

router.post("/", (req, res) => {
  const {newcat} = req.body;
  if(newcat) {
    db.add(newcat, (items) => {
      res.status(200).json(items);
    });
  }
  else {
    res.status(400).json({"msg": "Please check parameter again"});
  }
});

router.post("/delete", (req, res) => {
  const {id} = req.body;
  if(id) {
    db.getId(id, (result) => {
      if(result[0].report >= 2 && result[0].report >= 0.33*result[0].picked) {
        db.remove(id, () => {
          res.status(200).send();
        })
      }
      else {
        db.report(id, () => {
          res.status(200).send();
        })
      }
    });
  }
  else {
    res.status(400).json({"msg": "Please check parameter again"});
  }
});

module.exports = router;