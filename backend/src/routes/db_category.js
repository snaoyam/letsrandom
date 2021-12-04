const CateModel = require("../dbmodels/category");

function getAll(callback) {
    CateModel.find({}, (error, result) => {
        if(error) {
            console.log(error);
            callback([]);
        }
        else {
            callback(result);
        }
    })
}

function find(cat, callback) {
    CateModel.find({category: cat}, (error, result) => {
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
    CateModel.updateOne({_id: id}, {
        $inc: {
            picked: 1
        }
    }, (error, result) => { });
}

/* Optional, pick random n categories */
/*function getRandom(cat, n, callback) { }*/

function add(cat, callback) {
    const newItem = new CateModel({
        category: cat
    });
    newItem.save(() => {
        callback();
    })
}
function getId(id, callback) {
    CateModel.find({_id: id}, (error, result) => {
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
    CateModel.updateOne({_id: id}, {
        $inc: {
            report: 1
        }
    }, (error, result) => {
        callback(result);
    });
}
function remove(id, callback) {
    CateModel.deleteOne({_id: id}, (error) => {
        callback();
    });
}

module.exports = {
    getAll,
    incpicked,
    find,
    add,
    getId,
    report,
    remove
};