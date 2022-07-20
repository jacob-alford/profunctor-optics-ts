/**
 * Description TODO
 *
 * @since 1.0.0
 */
import { URIS2, Kind2 } from 'fp-ts/HKT'

// #############
// ### Model ###
// #############

/**
 * @since 1.0.0
 * @category Model
 */
export interface Optic<P extends URIS2, S, T, A, B> {
  (pab: Kind2<P, A, B>): Kind2<P, S, T>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface Optic_<P extends URIS2, S, A> extends Optic<P, S, S, A, A> {}
