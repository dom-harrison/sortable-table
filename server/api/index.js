const express = require('express');
const router = express.Router();
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

router.get('*', function(req, res) {
    res.sendfile(path.join(DATA_DIR, req.url));
});

module.exports = router;