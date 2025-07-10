const express = require('express');
const apiRouter = express.Router();
// const db = require('../server/db.js');

// apiRouter.get('/minions', (req, res, next) => {
// 	const minions = db.getAllFromDatabase('minions');
// 	if (minions === null) {
// 		return res.status(404).send('no minions, man');
// 	}
// 	return res.status(200).send(minions);
// });

module.exports = apiRouter;
