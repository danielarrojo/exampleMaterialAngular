import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/characters';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit {

  @Input() character!:Character;
   
  constructor() { }

  ngOnInit(): void {
  }

}
