import express from 'express'

import * as db from '../db/index.ts'

import { Location } from '../../models/Location.ts'

const router = express.Router()

// GET /api/v1/locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await db.getAllLocations()

    res.json({ locations })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    // TODO: Get the location based on its id and replace this viewData
    const location = await db.getLocationById(id)
    


    res.json(location)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { name, description } = req.body
    const result = await db.updateLocation({'id': id, name, description})
    res.json(result)
    //res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

export default router
