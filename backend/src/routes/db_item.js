const ItemModel = require("../dbmodels/item");

function getAll(categoryid, callback) {
    ItemModel.find({}, (error, result) => {
        if(error) {
            console.log(error);
            callback([]);
        }
        else {
            callback(result);
        }
    })
}

function incpicked(id) {
    ItemModel.updateOne({_id: id}, {
        $inc: {
            picked: 1
        }
    }, (error, result) => { });
}

function getRandom(categoryid, callback) {
    ItemModel.find({category: categoryid}, (error, result) => {
        if(error) {
            console.log(error);
            callback([]);
        }
        else {
            callback([result[Math.floor(Math.random() * result.length)]]);
        }
    })
}

function add(categoryid, name, callback) {
    const newItem = new ItemModel({
        category: categoryid,
        name: name
    });
    newItem.save(() => {
        callback();
    })
}
function getId(id, callback) {
    ItemModel.find({_id: id}, (error, result) => {
        if(error) {
            console.log(error);
            callback([]);
        }
        else {
            callback(result);
        }
    })
}
function report(id, callback) {
    ItemModel.updateOne({_id: id}, {
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
    getAll,
    incpicked,
    getRandom,
    add,
    getId,
    report,
    remove
};
