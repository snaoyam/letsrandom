const express = require("express");
const db = require("./db_item");
const db_cat = require("./db_category");
const router  = express.Router();

router.get("/:categoryid", (req, res) => {
  const {categoryid} = req.params;
  db.getRandom(categoryid, (items) => {
    if(items[0]) {
      res.json(items);
      db.incpicked(items[0].id);
    }
    else {
      db_cat.find(categoryid, (items) => {
        console.log(items);
        if(items[0])
          res.status(200).json({"msg": "Nothing Found!"})
        else
          res.status(404).json({"msg": "404 not found"})
      })
    }
  });
});

router.post("/:categoryid", (req, res) => {
  const {categoryid} = req.params;
  const {newitem} = req.query;
  if(categoryid && newitem) {
    db.add(categoryid, newitem, () => {
      res.status(200).json({"msg": "success!"});
    });
  }
  else {
    res.status(400).json({"msg": "Please check parameter again"});
  }
});

router.delete("/:categoryid", (req, res) => {
  const {categoryid} = req.params;
  const {id} = req.query;
  if(categoryid && id) {
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