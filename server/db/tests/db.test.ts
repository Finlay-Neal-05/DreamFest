import { describe, beforeEach, beforeAll, it, expect } from 'vitest'
import { connection, getEventsByDay } from '../index.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('schedule', () => {
  it('has a bunch of events', async () => {
    const data = await getEventsByDay('friday')
    expect(data).toMatchInlineSnapshot(`
      [
        {
          "day": "friday",
          "description": "Not the biggest stage, but perhaps the most hip.",
          "id": 1,
          "location_id": 1,
          "name": "TangleStage",
          "time": "2pm - 3pm",
        },
        {
          "day": "friday",
          "description": "It's a freakin' yurt! Get in here!",
          "id": 2,
          "location_id": 2,
          "name": "Yella Yurt",
          "time": "6pm - 7pm",
        },
      ]
    `)
  })
})
