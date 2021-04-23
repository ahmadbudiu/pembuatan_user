const express = require('express');
const { body } = require('express-validator');
const playerController = require('../../controllers/player.controller');

const router = express.Router({mergeParams: true});

router.post(
    '/',
    body('userId').isLength({min: 1}),
    body('displayName').isLength({min: 2}),
    playerController.create
);

router.get('/', playerController.getAll);
router.get('/:playerId', playerController.getOne);

router.patch(
    '/:playerId',
    body('userId').isLength({min: 1}),
    body('displayName').isLength({min: 2}),
    playerController.update
);

module.exports = router;
