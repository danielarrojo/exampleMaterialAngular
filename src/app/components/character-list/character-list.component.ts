import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Character } from 'src/app/interfaces/characters';
import { CharactersDataService } from 'src/app/services/characters-data.service';
import { MatPaginator } from '@angular/material/paginator';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, AfterViewInit {


  
  public characters: Character[] = [];

  displayedColumns:string[] = ['name','species','gender','created'];
  data:Character[] = [];

  resultsLength = 0;

  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(private charactersService:CharactersDataService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
 /*   const page:number = 22;
    this.charactersService.getCharactersPaged(page).subscribe( 
      respCharacters => this.data=respCharacters.results, 
      error => console.log(error), 
      () => console.log(this.data)
    )
*/
    merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(()=>{
        return this.charactersService.getCharactersPaged(this.paginator.pageIndex+1);
      }),
      map(data=>{
          console.log(data);
          const results=data['results'];
          this.resultsLength = data['info']['count'];
          return results;
      }), 
      catchError(()=>{
        return observableOf([]);
      })
    ).subscribe(data => this.data = data);

  }

}
