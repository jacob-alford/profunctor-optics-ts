/**
 * Description TODO
 *
 * @since 1.0.0
 */
import { Strong4 } from 'fp-ts/Strong'
import { Profunctor4 } from 'fp-ts/Profunctor'
import { pipe } from 'fp-ts/function'

// #############
// ### Model ###
// #############

/**
 * @since 1.0.0
 * @category Model
 */
export interface Shop<A, B, S, T> {
  get: (s: S) => A
  set: (s: S) => (b: B) => T
}

// #####################
// ### Non-Pipeables ###
// #####################

const _map: Profunctor4<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _promap: Profunctor4<URI>['promap'] = (fa, f, g) => pipe(fa, promap(f, g))

// #################
// ### Instances ###
// #################

/**
 * @since 1.0.0
 * @category Instances
 */
export const URI = 'Shop'

/**
 * @since 1.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/HKT' {
  interface URItoKind4<S, R, E, A> {
    readonly [URI]: Shop<S, R, E, A>
  }
}

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: Shop<S, R, E, A>) => Shop<S, R, E, B> =
  f =>
  ({ get, set }) => ({
    get,
    set: e => r => f(set(e)(r)),
  })

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const promap: <A, B, D, E>(
  f: (d: D) => E,
  g: (a: A) => B
) => <S, R>(fa: Shop<S, R, E, A>) => Shop<S, R, D, B> =
  (f, g) =>
  ({ get, set }) => ({
    get: d => get(f(d)),
    set: d => r => g(set(f(d))(r)),
  })

/**
 * @since 1.0.0
 * @category Instances
 */
export const Profunctor: Profunctor4<URI> = {
  URI,
  map: _map,
  promap: _promap,
}

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const first: <S, R, A, B, C>(
  pab: Shop<S, R, A, B>
) => Shop<S, R, [A, C], [B, C]> = ({ get, set }) => ({
  get: ([a]) => get(a),
  set:
    ([s, c]) =>
    b =>
      [set(s)(b), c],
})

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const second: <S, R, A, B, C>(
  pab: Shop<S, R, B, C>
) => Shop<S, R, [A, B], [A, C]> = ({ get, set }) => ({
  get: ([, a]) => get(a),
  set:
    ([c, s]) =>
    b =>
      [c, set(s)(b)],
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Strong: Strong4<URI> = {
  ...Profunctor,
  first,
  second,
}
