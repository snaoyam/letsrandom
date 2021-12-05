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
    CateModel.find({_id: cat}, (error, result) => {
        if(error) {
            console.log(error);
            callback([]);
        }
        else {
            callback(result);
        }
    })
}

function incpicked(cat, callback) {
    CateModel.updateOne({_id: cat}, {
        $inc: {
            picked: 1
        }
    }, (error, result) => { callback(); });
}

/* Optional, pick random n categories */
/*function getRandom(cat, n, callback) { }*/

function add(cat, callback) {
    const newItem = new CateModel({
        category: cat
    });
    newItem.save((error, result) => {
        callback(result);
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
