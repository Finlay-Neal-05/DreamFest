// @vitest-environment jsdom
import { setupApp } from './setup.tsx'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
})

describe('clicking delete does something', () => {
  it('delete when clicked', async () => {
    const scope = nock('http://localhost:3000')
      .delete(`/api/v1/events/1`)
      .reply(202, {
        id: 1,
      })

    const screen = setupApp('/events/1/edit')
    const button = screen.findByText('Delete event')
    console.log(scope)
    scope.pendingMocks()
    expect(button).toBeVisible
    expect(scope.isDone()).toBe(true)
  })
})
