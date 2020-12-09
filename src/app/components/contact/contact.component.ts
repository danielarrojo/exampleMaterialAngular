import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  patternEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() { 
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    console.log(form);
  }

  createFormGroup(){
    return new FormGroup({
      firstName : new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName : new FormControl('', [Validators.required, Validators.minLength(5)]),
      address : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      email : new FormControl('', [Validators.required, Validators.pattern(this.patternEmail)]),
      birthDate : new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    });
  }

}
