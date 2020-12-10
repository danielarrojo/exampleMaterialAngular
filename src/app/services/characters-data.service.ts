import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Characters } from '../interfaces/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataService {

  private apiUrl:string = "https://rickandmortyapi.com/api/";
  private charactersUrl:string="character";

  constructor(private http:HttpClient) { }

  getCharacters():Observable<Characters>{
    return this.http.get<Characters>(this.apiUrl+this.charactersUrl);
  }

  getCharactersPaged(sort: string, page:number):Observable<Characters>{
    const requestUrl = this.apiUrl + this.charactersUrl + '?page=' + (page);
    return this.http.get<Characters>(requestUrl);
  }

  getCharactersByName(name:string):Observable<Characters>{
    const requestUrl = this.apiUrl + this.charactersUrl + '?name=' + (name);
    return this.http.get<Characters>(requestUrl);
  }

}
