/**
 * Created by brillwill on 16/7/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
    seq:[String],
    email:String
});

module.exports = mongoose.model("Record", RecordSchema);