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
  isAccepted:number = 0;

  showDelay = new FormControl(1000);
  hideDelay = new FormControl(1000);

  constructor() { 
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void { 
  }

  onChangeTerms(event:any){
    if (event.checked == true){
      this.isAccepted=1;
    } else {
      this.isAccepted=0;
    }
    console.log('this.isAccepted : ',this.isAccepted);
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
      gender: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required]),
      isAccepted: new FormControl()
    });
  }

}
