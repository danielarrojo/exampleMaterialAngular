import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { CharacterGridComponent } from './components/character-grid/character-grid.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Route[] = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'charactergrid', component: CharacterGridComponent },
  { path: 'characterlist', component: CharacterListComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo:'/welcome', pathMatch:'full'},
  { path: '**', redirectTo:'/welcome', pathMatch:'full'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
