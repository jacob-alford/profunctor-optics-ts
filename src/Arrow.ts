/**
 * Typeclass instances for `a -> b` function types
 *
 * @since 1.0.0
 */
import { Category2 } from 'fp-ts/Category'
import { Choice2 } from 'fp-ts/Choice'
import * as E from 'fp-ts/Either'
import { Semigroupoid2 } from 'fp-ts/Semigroupoid'
import { Profunctor2 } from 'fp-ts/Profunctor'
import { Strong2 } from 'fp-ts/Strong'
import { flow, identity, pipe } from 'fp-ts/function'

// #############
// ### Model ###
// #############

/**
 * @since 1.0.0
 * @category Model
 */
export type Arrow<A, B> = (a: A) => B

// #####################
// ### Non-Pipeables ###
// #####################

const _map: Profunctor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _promap: Profunctor2<URI>['promap'] = (fa, f, g) => pipe(fa, promap(f, g))

// #################
// ### Instances ###
// #################

/**
 * @since 1.0.0
 * @category Instances
 */
export const URI = 'Arrow'

/**
 * @since 1.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Arrow<E, A>
  }
}

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: (e: E) => A) => (e: E) => B =
  f => fa =>
    flow(fa, f)

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const promap: <D, E, A, B>(
  f: (f: D) => E,
  g: (a: A) => B
) => (fa: (e: E) => A) => (f: D) => B = (f, g) => fa => flow(f, fa, g)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Profunctor: Profunctor2<URI> = {
  URI,
  map: _map,
  promap: _promap,
}

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const first: Strong2<URI>['first'] =
  pab =>
  ([a, c]) =>
    [pab(a), c]

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const second: Strong2<URI>['second'] =
  pab =>
  ([c, a]) =>
    [c, pab(a)]

/**
 * @since 1.0.0
 * @category Instances
 */
export const Strong: Strong2<URI> = {
  ...Profunctor,
  first: first,
  second: second,
}

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const left: Choice2<URI>['left'] = E.mapLeft

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const right: Choice2<URI>['right'] = E.map

/**
 * @since 1.0.0
 * @category Instances
 */
export const Choice: Choice2<URI> = {
  ...Profunctor,
  left,
  right,
}

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const compose: Semigroupoid2<URI>['compose'] = flow

/**
 * @since 1.0.0
 * @category Instances
 */
export const Semigroupoid: Semigroupoid2<URI> = {
  URI,
  compose,
}

/**
 * @since 1.0.0
 * @category Instance Operations
 */
export const id: Category2<URI>['id'] = () => identity

/**
 * @since 1.0.0
 * @category Instances
 */
export const Category: Category2<URI> = {
  ...Semigroupoid,
  id,
}
