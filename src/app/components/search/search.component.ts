import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Character, Characters } from 'src/app/interfaces/characters';
import { CharactersDataService } from 'src/app/services/characters-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchControl = new FormControl();
  searchFormGroup = new FormGroup({
    searchControl: this.searchControl
  });

  dataCharacters!:Characters;
  characterList!:Observable<Character[]>;
  character!:Character;




  constructor(private getDataServices:CharactersDataService) { }

  ngOnInit(): void {
    
    this.characterList = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (value!==''){
          return this.searchName(value);
        } else {
          return of(null)
        }
      })
    );
  }

  searchName(value:string): Observable<any>{
    return this.getDataServices.getCharactersByName(value.toLowerCase()).pipe(
      map(data => {
        const charArray:Characters = data;
        return charArray.results;
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

  setCharacter(char:Character){
    console.log('-----------------');
    console.log(char);
    this.character = char;
  };


}
