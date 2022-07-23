/**
 * Typeclass instances for `a -> b` function types
 *
 * @since 1.0.0
 */
import { flow } from 'fp-ts/function'

import { lensC, OpticC } from './Optic'

/**
 * @since 1.0.0
 * @category Utilities
 */
export const prop =
  <A extends {}, K extends keyof A>(k: K) =>
  <S>(sa: OpticC<S, A>): OpticC<S, A[K]> =>
    flow(
      lensC(
        a => a[k],
        a => ak => ({ ...a, [k]: ak })
      ),
      sa
    )
