/**
 * Description TODO
 *
 * @since 1.0.0
 */
import { URIS2 } from 'fp-ts/HKT'
import { Choice2 } from 'fp-ts/Choice'
import * as E from 'fp-ts/Either'
import { identity } from 'fp-ts/function'

import { Optic } from './Optic'

// #############
// ### Model ###
// #############

/**
 * @since 1.0.0
 * @category Model
 */
export interface Prism<P extends URIS2, S, T, A, B> extends Optic<P, S, T, A, B> {}

/**
 * @since 1.0.0
 * @category Model
 */
export interface Prism_<P extends URIS2, S, A> extends Prism<P, S, S, A, A> {}

// ####################
// ### Constructors ###
// ####################

/**
 * @since 1.0.0
 * @category Constructors
 */
export const prism =
  <P extends URIS2>(C: Choice2<P>) =>
  <B, T>(to: (b: B) => T) =>
  <A, S>(fro: (s: S) => E.Either<T, A>): Prism<P, S, T, A, B> =>
  pab =>
    C.promap(C.right<T, A, T>(C.map(pab, to)), fro, E.fold(identity, identity))

/**
 * @since 1.0.0
 * @category Constructors
 */
export const prismC: <P extends URIS2>(
  C: Choice2<P>
) => <S, A>(to: (a: A) => S) => (fro: (s: S) => E.Either<S, A>) => Prism<P, S, S, A, A> =
  prism
