const express = require("express");
const db = require("../db");
const router  = express.Router();

router.get("/:category", (req, res) => {
  const {category} = req.params;
  db.getRandom(category, (items) => {
    res.json(items);
    db.incpicked(items[0].id);
  });
});

router.post("/:category", (req, res) => {
  const {category} = req.params;
  const {newitem} = req.body;
  if(category && newitem) {
    db.add(category, newitem, () => {
      res.status(200).json({"msg": "success!"});
    });
  }
  else {
    res.status(300).json({"msg": "Please check parameter again"});
  }
});

router.delete("/:category", (req, res) => {
  const {category} = req.params;
  const {id} = req.query;
  if(category && id) {
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
    res.status(300).json({"msg": "Please check parameter again"});
  }
});

module.exports = router;