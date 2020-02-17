import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LikeService {
	private baseUrl = 'http://localhost:8080/geek/';
  private baseUrlPhoto = 'http://localhost:8080/photo/album/';


  constructor(private http: HttpClient) { }

	getAll(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
  getById(id: number) {
    return this.http.get(`${this.baseUrlPhoto}?id=`+id);
  }
}
