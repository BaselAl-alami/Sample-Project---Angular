import { Observable } from 'rxjs';

/**
 * @argument T is an entity class/interface
 */
export interface HttpService<T> {
    getAll$(): Observable<T[]>;
    getById$(id: number): Observable<T>;
    post$(entity: T): Observable<T>
    put$(entity: T): Observable<T>
    delete$(entity: T): Observable<T>
}