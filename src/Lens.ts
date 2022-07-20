/**
 * Description TODO
 *
 * @since 1.0.0
 */
import { URIS2 } from 'fp-ts/HKT'
import { Strong2 } from 'fp-ts/Strong'

import { Optic } from './Optic'

// #############
// ### Model ###
// #############

/**
 * @since 1.0.0
 * @category Model
 */
export interface Lens<P extends URIS2, S, T, A, B> extends Optic<P, S, T, A, B> {}

/**
 * @since 1.0.0
 * @category Model
 */
export interface Lens_<P extends URIS2, S, A> extends Lens<P, S, S, A, A> {}

// ####################
// ### Constructors ###
// ####################

/**
 * @since 1.0.0
 * @category Constructors
 */
export const lens: <P extends URIS2>(
  S: Strong2<P>
) => <S, A>(
  get: (s: S) => A
) => <B, T>(set: (s: S) => (b: B) => T) => Lens<P, S, T, A, B> = S => get => set =>
  lens_(S)(s => [get(s), b => set(s)(b)])

/**
 * @since 1.0.0
 * @category Constructors
 */
export const lensC: <P extends URIS2>(
  S: Strong2<P>
) => <S, A>(get: (s: S) => A) => (set: (s: S) => (b: A) => S) => Lens<P, S, S, A, A> =
  lens

/**
 * @since 1.0.0
 * @category Internal
 */
const lens_ =
  <P extends URIS2>(S: Strong2<P>) =>
  <S, T, A, B>(to: (s: S) => [A, (b: B) => T]): Lens<P, S, T, A, B> =>
  pab =>
    S.promap(S.first<A, B, (b: B) => T>(pab), to, ([b, f]) => f(b))
