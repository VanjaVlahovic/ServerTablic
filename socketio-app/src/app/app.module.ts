import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChatService} from './chat.service';
import {WebsocketService} from './websocket.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CardsComponent } from './cards/cards.component'; // <-- NgModel lives here

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    ChatService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
