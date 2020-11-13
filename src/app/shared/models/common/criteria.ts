import { Observable } from 'rxjs';

/**
 * @argument T is an criteria class/interface
 * @argument K is an entity class/interface
 * @summary handle criteria.
 */
export interface Criteria<T, K> {
    getByCriteria$(criteria: T): Observable<K[]>;
}