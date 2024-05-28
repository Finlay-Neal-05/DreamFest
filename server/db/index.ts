import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

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