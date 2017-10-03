import { SearchPipe } from './item-list/searchpipe.pipe';
import { GrobalDataService } from './shared/grobal.service';
import { Http, HttpModule } from '@angular/http';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './shared/data.service';
import { HeritageService } from './shared/heritage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent, OverviewDialog } from './item-list/item/item.component';
import { MdGridListModule } from '@angular/material';
import { MdToolbarModule, MdIconModule, MatCardModule, MatInputModule, MatListModule, MatButtonModule, MatDialogModule, MatAutocompleteModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatChipsModule } from '@angular/material';

import { MapComponent } from './item-list/item/map/map.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { Step1Component } from './create-item/step-1/step-1.component';
import { Step2Component } from './create-item/step-2/step-2.component';
import { Step3Component } from './create-item/step-3/step-3.component';
import { Step4Component } from './create-item/step-4/step-4.component';
import { Step5Component } from './create-item/step-5/step-5.component';
import { StepCompleteComponent } from './create-item/step-complete/step-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2UploaderModule } from 'ng2-uploader';
import { MapViewComponent } from './map-view/map-view.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import {ShareButtonsModule} from 'ngx-sharebuttons';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'items/:id',
    component: ItemListComponent
  },
  { path: 'item/:id', component: ItemComponent },
  { path: 'item', component: ItemComponent },
  { path: 'create-item', component: CreateItemComponent },
  { path: 'step-1', component: Step1Component },
  { path: 'step-2', component: Step2Component },
  { path: 'step-3', component: Step3Component },
  { path: 'step-4', component: Step4Component },
  { path: 'step-5', component: Step5Component },
  { path: 'step-complete', component: StepCompleteComponent },
  { path: 'gallery-view', component: GalleryViewComponent },  
  {
    path: 'map-view/:id',
    component: MapViewComponent
  },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ItemListComponent,
    ItemComponent,
    PageNotFoundComponent,
    OverviewDialog,
    MapComponent,
    CreateItemComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    StepCompleteComponent,
    MapViewComponent,
    GalleryViewComponent,
    SearchPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,  
    BrowserAnimationsModule,
    HttpModule,
    ShareButtonsModule.forRoot(),
    Ng2UploaderModule,
    MdGridListModule,
    MdToolbarModule,
    MdIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  entryComponents: [
    OverviewDialog
  ],
  providers: [DataService, HeritageService, GrobalDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
