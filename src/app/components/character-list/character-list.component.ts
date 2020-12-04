import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Character } from 'src/app/interfaces/characters';
import { CharactersDataService } from 'src/app/services/characters-data.service';
import { MatPaginator } from '@angular/material/paginator';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, AfterViewInit {


  
  public characters: Character[] = [];

  displayedColumns:string[] = ['image','name','species','gender','created'];
  data:Character[] = [];


  resultsLength = 0;
  isLoadingResults = true;
  isDataError = false;

  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  @ViewChild(MatSort, {static:false}) sort!:MatSort;

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
        this.isLoadingResults = true;
        return this.charactersService.getCharactersPaged(this.sort.active, this.paginator.pageIndex+1);
      }),
      map(data=>{
        
          this.isLoadingResults = false;
          this.isDataError = false;
          const results=data['results'];
          this.resultsLength = data['info']['count'];
          return results;
      }), 
      catchError(()=>{
        this.isLoadingResults = false;
        this.isDataError = true;
        return observableOf([]);
      })
    ).subscribe(data => this.data = data);

  }

  showMe(rowId:number, rowName:string){
    console.log("Show me ::: ", rowId," ::: ", rowName);
  }

  sortData(mySort:Sort){
    const myData = this.data.slice()
    this.data = myData.sort();
    if (!mySort.active || mySort.direction === '') {
       this.data = myData;
       return;
    }
    this.data = myData.sort((a, b) => {
       const isAsc = mySort.direction === 'asc';
       switch (mySort.active) {
          case 'name': 
          console.log('name');
          return this.compare(a.name, b.name, isAsc);
          case 'gender': 
          console.log('gender');
          return this.compare(a.gender, b.gender, isAsc);
          case 'species': 
          console.log('species');
          return this.compare(a.species, b.species, isAsc);
          case 'created': 
          console.log('created');
          return this.compare(a.created, b.created, isAsc);

          default: return 0;
       } 
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
