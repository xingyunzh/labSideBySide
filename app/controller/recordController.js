/**
 * Created by brillwill on 16/7/19.
 */
var Record = require('../model/record');

exports.saveResult = function (req, res) {
    console.log("req.body " + req.body.email + req.body.seq.toString());
    var emailParam = req.body.email;
    var seqParam = req.body.seq;
    if (emailParam == null || seqParam == null) {
        res.json({status:"E", body:"bad params"});
        return;
    }

    Record.findOneAndUpdate({email:emailParam}, {email:emailParam,seq:seqParam},{upsert:true}, function (err,doc) {
        if (err){
            res.json({status:"E", body:err});
        } else {
            res.json({status:"S", body:{email:emailParam}});
        }
    });
}

exports.getByEmail = function (req, res) {
    Record.findOne({email:req.params.email},function (err, doc) {
        if (err) {
            res.json({status:"E", body:err});
        }
        else {
            res.json({status:'S', body:doc});
        }
    });
}