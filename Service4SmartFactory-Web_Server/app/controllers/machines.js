var Machine = require('../models/machine');
var Sensor = require('../models/sensor');

exports.getMachineInfo = function(req, res) {
    Machine.find({
        nearWorkerID: req.query.workerID
    }, {
        _id: 0,
        machineID: 1,
        name: 1,
        accessLevel: 1
    }, function(err, machineData) {
        if (err) {
            res.send(err);
        }
        if (!machineData) return res.status(404).send({
            err: "User not Found"
        });
        res.json(machineData);
    });
}

function finding(startHour, endHour, machineID, sensorName) {
    return new Promise(function(resolve, reject) {
        console.log(startHour.toISOString() + " / " + endHour.toISOString());
        Sensor.aggregate({
            $match: {
                machineID: machineID
                    //machineID: req.query.machineID
            }
        }, {
            $unwind: "$sensorState"
        }, {
            $match: {
                "sensorState.sensor": sensorName
            }
        }, {
            $match: {
                "sensorState.time": {
                    $gte: new Date(endHour.toISOString()),
                    $lt: new Date(startHour.toISOString())
                }
            }
        }, {
            $group: {
                _id: null,
                A: {
                    $avg: "$sensorState.data"
                }
            }
        }, {
            $project: {
                _id: 0,
                A: 1
            }
        }, (err, sensorData) => {
            if (err) {
                reject(err);
            }
            if (!sensorData) reject(err);
            console.log(sensorData);
            resolve(sensorData);
        });
    })
}

exports.getSensorData = function(req, res) {
    var machineID = req.query.machineID;
    var hourList = [],
        valueHistory = [];
    for (var i = 1; i <= 12; i++) {
        hourList.push(new Date(new Date().setHours(new Date().getHours() - i + 9)));
    }

    for (var j = 0; j < 2; j++) {
        if (j == 0) {
            for (var i = 0; i < hourList.length - 1; i++) {
                valueHistory.push(finding(hourList[i], hourList[i + 1], machineID, "solar"));
            }
        } else if (j == 1) {
            for (var i = 0; i < hourList.length - 1; i++) {
                valueHistory.push(finding(hourList[i], hourList[i + 1], machineID, "photosynthetic"));
            }
        }
    }

    Promise.all(valueHistory).then(function(results) {
        console.log(results);
        res.send(results);
    }).catch(function(err) {
        //console.log(err);
        res.send(err);
    });
}

exports.getManual = function(req, res) {
    var manualNum = 0;
    // 0 : ?????? ??????
    // 1 : solar??? ??????
    // 2 : solar??? ??????
    // 3 : photosynthetic??? ??????
    // 4 : photosynthetic??? ??????
    Machine.find({
        nearWorkerID: req.query.workerID
    }, {
        _id: 0,
        sensorState: 1
    }, (err, sensorData) => {
        var solar = sensorData[0].sensorState.solar;
        var photosynthetic = sensorData[0].sensorState.photosynthetic;
        if (solar > 1000) {
            //?????? ??????
            manualNum = 1;
        } else if (solar < 400) {
            //?????? ?????????
            manualNum = 2;
        } else{
            manualNum = 0;
        }
        Machine.find({
            nearWorkerID: req.query.workerID
        }, {
            _id: 0,
            sensorState: 0,
            num: 0,
            accessLevel: 0,
            manual: {
                $elemMatch: {
                    num: String(manualNum)
                }
            }
        }, (err, manualData) => {
            if (err) {
                res.send(err);
            }
            if (!manualData) {
                console.log("???????????? ?????? ??????");
                //a = [{ "manual": [{ "instruction": ["?????? ????????? ??????????????? ????????????."] }] }]
                return res.status(404).send({
                    err: "manual data not Found"
                });
                //res.json(a);
            }
            res.json(manualData);
        });
    })

}