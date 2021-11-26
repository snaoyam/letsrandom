const ItemModel = require("./models/item");

function getRandom(cat, callback) {
    ItemModel.find({category: cat}, (error, result) => {
        if(error) {
            console.log(error);
            callback([]);
        }
        else {
            callback(result[Math.floor(Math.random()*result.length)]);
        }
    })
}
function add(cat, name, callback) {
    const newItem = new ItemModel({
        category: cat,
        name: name
    });
    newItem.save((error, result) => {
        callback(result);
    })
  }
function report(cat, name, callback) {
    ItemModel.update({category: cat, name: name}, {
        $inc: {
            report: 1
        }
    }, (error, result) => {
        callback(result);
    });
}
function remove(id, callback) {
    ItemModel.deleteOne({_id: id}, (error) => {
        callback();
    });
}

module.exports = {
    getRandom,
    add,
    report,
    remove
};
