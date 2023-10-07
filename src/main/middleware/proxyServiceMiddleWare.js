

module.exports = (_params, next) => {
    const express = require('express');
    const cors = require('cors');
    const request = require('request');

    const service = express();
    service.use(cors());

    service.all('/api/*', (req, res) => {
        request.get(req.query.url, (err, _, body) => {
            if (err) {
                console.log('err: ', err);
            }
            else {
                res.end(body);
            }
        });
    });

    service.listen(3001, () => {
        console.log('Server is running on port 3001');
    });

    next();
};