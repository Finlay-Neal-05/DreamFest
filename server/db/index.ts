import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'
import { describe } from 'vitest'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations() {
  const locations = await connection('locations').select()
  return locations as Location[]
}

export async function getEventsByDay(day: string) {
  const events = await connection('events')
    .join('locations', 'location_id', 'locations.id')
    .select(
      'events.id' as 'eventsId',
      'location_id' as 'locationId',
      'events.name' as 'eventsName',
      'locations.name' as 'locationName',
      'events.day',
      'events.time',
      'events.description' as 'eventDescription',
      'locations.description' as 'locationDescription'

    )
    .where({'events.day': day})

  return events as EventWithLocation[]
}

export async function deleteEventById(id: number) {
  const result = await connection('events').where({ id }).del()
  return result
}

export async function getLocationById(id: string) {
  const events = await connection('locations').where({ id }).first()
  return events as Location
}

export async function updateLocation(updatedLocation: Location) {
  const changes = await connection('locations')
    .where({ id: updatedLocation.id })
    .update({
      id: updatedLocation.id,
      name: updatedLocation.name,
      description: updatedLocation.description,
    })
  console.log(changes)

  const result = await connection('locations')
    .where({ id: updatedLocation.id })
    .first()

  return result as Location
}
//name: string, description: string, time: string, day:string, locationId: number
//name, description, time, day, locationId
export async function addNewEvent(eventObj: EventData) {
  console.log(eventObj)
  const { locationId, ...rest } = eventObj
  const [id] = await connection('events').insert({
    location_id: locationId,
    ...rest,
  })
  return id
}