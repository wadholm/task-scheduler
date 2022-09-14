let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello Index"
        }
    };

    res.json(data);
});
module.exports = router;
