import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mp } from '../../_models/mp';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8080/mp/';

  constructor(private http: HttpClient) { }

  /**
   * Affiche la liste des mp d'un geek
   *
   * @param id
   */
  getMpByGeek(id: number): Observable<Mp> {
    return this.http.get<Mp>(`${this.baseUrl}` + id);
  }

  /**
   * Affiche la liste des mps entre deux geeks
   *
   * @param idEmetteur
   * @param idRecepteur
   */
  getAllMP(idEmetteur: number, idRecepteur: number): Observable<Mp> {
    return this.http.get<Mp>(`${this.baseUrl}` + idEmetteur + '/' + idRecepteur, {});
  }

  /**
   * Permet d'écrire un mp
   *
   * @param newMp
   */
  addNew(newMp: Mp): Observable<Mp> {
    return this.http.post<Mp>(`${this.baseUrl}`, newMp);
  }
}
