const express = require('express');
const minionsRouter = express.Router();
const db = require('../server/db.js');

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
	const minions = db.getAllFromDatabase('minions');
	if (minions === null) {
		res.status(404).send('no minions, man');
	}
	res.status(200).send(minions);
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
	const minions = db.getAllFromDatabase('minions');
	const minionToAdd = req.body;
	if (minions && minionToAdd) {
		const instance = db.addToDatabase('minions', minionToAdd);
		res.status(201).send(instance);
	} else {
		res.status(404).send('not found');
	}
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
	const minionId = req.params.minionId;

	if (isNaN(minionId)) {
		return res.status(404).send('invalid ID');
	}

	const minion = db.getFromDatabaseById('minions', minionId);

	if (minion) {
		res.status(200).send(minion);
	} else {
		res.status(404).send(`minion with this ID doesn't exist`);
	}
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
	const minionId = req.params.minionId;

	if (isNaN(minionId)) {
		return res.status(404).send('invalid ID');
	}

	const minions = db.getAllFromDatabase('minions');
	const minionDbById = minions.find((minion) => minion.id === minionId);

	if (minionDbById) {
		const minionToUpdate = req.body;
		const updatedMinion = db.updateInstanceInDatabase(
			'minions',
			minionToUpdate
		);
		res.status(200).send(updatedMinion);
	} else {
		res.status(404).send('minion with this id does not exist');
	}
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
	const minionId = req.params.minionId;

	if (isNaN(minionId)) {
		return res.status(404).send('invalid ID');
	}

	const minions = db.getAllFromDatabase('minions');
	const minionDbById = minions.find((minion) => minion.id === minionId);

	if (minionDbById) {
		const deleteStatus = db.deleteFromDatabasebyId('minions', minionId);
		if (deleteStatus === true) {
			res.status(204).send();
		} else {
			res.status(404).send('minion was not deleted');
		}
	} else {
		res.status(404).send('minion with this ID not found');
	}
});

module.exports = minionsRouter;
