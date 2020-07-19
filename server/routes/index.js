const express = require('express');
const router = express.Router();
const request = require('request');
// const os = require("os");
require('dotenv').config();

// router.get("/getUsername", function(req, res, next) {
//     res.send({ username: os.userInfo().username });
// });

router.post("/trackingInfo", function(req, res, next) {
    // res.send({ username: req.body.name });
    request({
        uri: 'http://info.sweettracker.co.kr/api/v1/trackingInfo',
        qs: {
            t_key: process.env.T_KEY,
            t_code: req.body.t_code,
            t_invoice: req.body.t_invoice,
        }
    }).pipe(res);
});

module.exports = router;