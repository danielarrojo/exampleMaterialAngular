import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/characters';
import { CharactersDataService } from 'src/app/services/characters-data.service';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.css']
})
export class CharacterGridComponent implements OnInit {

  public characters: Character[] = [];

  constructor(private charactersService:CharactersDataService) { }

  ngOnInit(): void {

    this.charactersService.getCharacters().subscribe( 
      respCharacters => this.characters=respCharacters.results, 
      error => console.log(error), 
      () => console.log(this.characters)
    )

  }
 
}
