const express = require("express");
const db = require("./db_item");
const db_cat = require("./db_category");
const router  = express.Router();

router.get("/:category", (req, res) => {
  const {category} = req.params;
  db.getRandom(category, (items) => {
    if(items[0]) {
      res.json(items);
      db.incpicked(items[0].id);
    }
    else {
      db_cat.find(category, (items) => {
        if(items[0])
          res.status(200).json({"msg": "Nothing Found!"})
        else
          res.status(404).json({"msg": "404 not found"})
      })
    }
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
    res.status(400).json({"msg": "Please check parameter again"});
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
    res.status(400).json({"msg": "Please check parameter again"});
  }
});

module.exports = router;