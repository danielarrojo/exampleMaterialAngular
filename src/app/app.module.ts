import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { SideNavListComponent } from './components/side-nav-list/side-nav-list.component';
import { CharacterGridComponent } from './components/character-grid/character-grid.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterItemComponent } from './components/character-item/character-item.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { DemoDialogComponent } from './components/dialogs/demo-dialog/demo-dialog.component';
import { MapsComponent } from './components/maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HeaderToolbarComponent,
    SideNavListComponent,
    CharacterGridComponent,
    WelcomeComponent,
    ContactComponent,
    CharacterItemComponent,
    CharacterListComponent,
    SearchComponent,
    DemoDialogComponent,
    MapsComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyD2QUQ948zFPWxF7mSp02Nz6ncZ_uaKBcQ', 
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
