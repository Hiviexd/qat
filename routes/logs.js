const express = require('express');
const Logger = require('../models/log');
const middlewares = require('../helpers/middlewares');

const router = express.Router();

router.use(middlewares.isLoggedIn);
router.use(middlewares.hasFullReadAccess);

const defaultPopulate = [{ path: 'user', select: 'username' }];

router.get('/search', async (req, res) => {
    let errors = [];

    if (req.session.osuId == 1052994 || req.session.osuId == 3178418) {
        errors = await Logger
            .find({ $or: [{ isError: true }, { category: 'interOp' }] })
            .populate(defaultPopulate)
            .sort({ createdAt: -1 })
            .limit(100)
            .skip(parseInt(req.params.skip));
    }

    res.json({
        errors,
        logs: await Logger
            .find({ isError: false, category: { $ne: 'interOp' } })
            .select('user action category relatedId createdAt')
            .populate(defaultPopulate)
            .sort({ createdAt: -1 })
            .limit(100)
            .skip(parseInt(req.query.skip) || 0),
    });
});

module.exports = router;
