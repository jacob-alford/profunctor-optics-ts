import { identity, pipe } from 'fp-ts/function'

import { id } from '../src/Optic'
import { prop } from '../src/struct'

interface DeepObject {
  a: {
    b: string
    c: {
      d: string
      e: ReadonlyArray<{ f: string }>
    }
  }
}

describe('struct', () => {
  describe('prop', () => {
    const lens = pipe(id<DeepObject>(), prop('a'), prop('c'), prop('d'))
    const test: DeepObject = {
      a: {
        b: 'foo',
        c: {
          d: 'bar',
          e: [],
        },
      },
    }
    it('gets a value in a structure', () => {
      expect(lens(() => 'baz')(test)).toBe('bar')
    })
  })
})
