/**
 * Description TODO
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { flow, identity, pipe } from 'fp-ts/function'

import { Arrow, promap, first, right, map } from './Arrow'

// #############
// ### Model ###
// #############

/**
 * @since 1.0.0
 * @category Model
 */
export interface Optic<S, T, A, B> {
  (pab: Arrow<A, B>): Arrow<S, T>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface OpticC<S, A> extends Optic<S, S, A, A> {}

// ####################
// ### Constructors ###
// ####################

/**
 * @since 1.0.0
 * @category Constructors
 */
export const id: <A>() => Optic<A, A, A, A> = () => identity

/**
 * @since 1.0.0
 * @category Constructors
 */
export const iso: <S, A>(f: (s: S) => A) => <B, T>(g: (b: B) => T) => Optic<S, T, A, B> =
  f => g =>
    promap(f, g)

/**
 * @since 1.0.0
 * @category Constructors
 */
export const isoC: <S, A>(f: (s: S) => A) => (g: (b: A) => S) => OpticC<S, A> = iso

/**
 * @since 1.0.0
 * @category Constructors
 */
export const lens: <S, T, A, B>(
  get: (s: S) => A,
  set: (s: S) => (b: B) => T
) => Optic<S, T, A, B> = (get, set) => lens_(s => [get(s), b => set(s)(b)])

/**
 * @since 1.0.0
 * @category Constructors
 */
export const lensC: <S, A>(get: (s: S) => A, set: (s: S) => (b: A) => S) => OpticC<S, A> =
  lens

/**
 * @since 1.0.0
 * @category Internal
 */
const lens_ = <S, T, A, B>(to: (s: S) => [A, (b: B) => T]): Optic<S, T, A, B> =>
  flow(
    pab => first<A, B, (b: B) => T>(pab),
    promap(to, ([b, f]) => f(b))
  )

/**
 * @since 1.0.0
 * @category Constructors
 */
export const prism =
  <B, T>(to: (b: B) => T) =>
  <A, S>(fro: (s: S) => E.Either<T, A>): Optic<S, T, A, B> =>
  pab =>
    pipe(
      pab,
      map(to),
      pat => right<T, A, T>(pat),
      promap(fro, E.fold(identity, identity))
    )

/**
 * @since 1.0.0
 * @category Constructors
 */
export const prismC: <S, A>(
  to: (a: A) => S
) => (fro: (s: S) => E.Either<S, A>) => OpticC<S, A> = prism
