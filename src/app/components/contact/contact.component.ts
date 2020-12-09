import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

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
      address : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
    });
  }

}
