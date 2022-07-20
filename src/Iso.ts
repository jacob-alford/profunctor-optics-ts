/**
 * Description TODO
 *
 * @since 1.0.0
 */
import { URIS2 } from 'fp-ts/HKT'
import { Profunctor2 } from 'fp-ts/Profunctor'

import { Optic } from './Optic'

// #############
// ### Model ###
// #############

/**
 * @since 1.0.0
 * @category Model
 */
export interface Iso<P extends URIS2, S, T, A, B> extends Optic<P, S, T, A, B> {}

/**
 * @since 1.0.0
 * @category Model
 */
export interface Iso_<P extends URIS2, S, A> extends Iso<P, S, S, A, A> {}

// ####################
// ### Constructors ###
// ####################

/**
 * @since 1.0.0
 * @category Constructors
 */
export const iso: <P extends URIS2>(
  P: Profunctor2<P>
) => <S, A>(f: (s: S) => A) => <B, T>(g: (b: B) => T) => Iso<P, S, T, A, B> =
  P => f => g => pab =>
    P.promap(pab, f, g)

/**
 * @since 1.0.0
 * @category Constructors
 */
export const isoC: <P extends URIS2>(
  P: Profunctor2<P>
) => <S, A>(f: (s: S) => A) => (g: (b: A) => S) => Iso<P, S, S, A, A> = iso
