//import { Component, OnInit, DoCheck } from '@angular/core';
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, MessageService]
})

//export class AppComponent implements OnInit, DoCheck {
export class AppComponent  {
  public title:string;
  public identity;
  public token;
  public messagesNoViewed;
  public stats;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService

  ){
    this.title = 'MyFriends';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url
  }

  ngOnInit(){
    
    this.getCountMessagesNoViewed();
  }

  //ngDoCheck: cada vez que se produce un cambio refrescar variables
  ngDoCheck(){//importar DoCheck
    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();
    //this.getCountMessagesNoViewed();
    //console.log(this.stats);
  }

  logout(){
    localStorage.clear();//vaciar el localStorage
    this.identity = null; //borrar los datos del usuario logueado
    this._router.navigate(['/']);
  }

  getCountMessagesNoViewed(){
    this._messageService.getMessagesNoViewed(this.token).subscribe(
      
      response => {
        console.log(response);
        this.messagesNoViewed = response.unviewed;
        console.log(this.messagesNoViewed)
      },
      error => {
          var errorMessage = <any> error;
          console.log(errorMessage);
      }
    );
  }
}
