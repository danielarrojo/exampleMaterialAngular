import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Character, Characters } from 'src/app/interfaces/characters';
import { CharactersDataService } from 'src/app/services/characters-data.service';
import { DemoDialogComponent } from '../dialogs/demo-dialog/demo-dialog.component';

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

  dialogResult:string = '';


  constructor(private getDataServices:CharactersDataService, public snackBar:MatSnackBar, public dialog:MatDialog) { }

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

  addFavorite(){
    console.log('addFavorite');

    let dialogRef = this.dialog.open(DemoDialogComponent, {
      width:'500px',
      data:'Do you want to add this character to your favorites?'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed by:', result);
      this.dialogResult = result;
    })

  }

  shareCharacter(){
    console.log('shareCharacter');
    this.snackBar.open("This is my snackbar message!", 'X', {
      duration:5000,
    horizontalPosition:'right',
    verticalPosition:'top',
    panelClass:['my-snack-bar']
    });
  }
}
