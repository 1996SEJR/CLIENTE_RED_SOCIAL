import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../modules/message';
import { UserService } from '../../../services/user.service';
import { FollowService } from '../../../services/follow.service';
import { GLOBAL } from '../../../services/global';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    providers: [UserService, MessageService, FollowService]
})

export class MainComponent implements OnInit {
    @ViewChild("contentMessages") contentMessages: ElementRef;
    
    public title:string;
    public allMessages;
    public allMessagesOnePeople; //todos los mensajes que se tenido con una persona
    public name_other_people;
    public url: string;
    public lastMessage;
    public id_other_person;
    public identity;
    public token;
    public message: Message;
    public message_modal: Message;
    public follows;
    public status: string;
    

    public constructor(
        private _messageService: MessageService,
        private _userService: UserService,
        private _followService: FollowService,
    ){
        this.title = 'Mensajes';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.message = new Message('', '', '', '', this.identity._id, '');
        this.message_modal = new Message('', '', '', '', this.identity._id, '');
        //$('#mensajes').scrollTop()
        //console.log(this.identity)
        //console.log(this.allMessagesOnePeople)
    }

    ngOnInit(){
        console.log('Componente de main cargado ...');
        this.getAllMessages();
        this.getMyFollows();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.contentMessages.nativeElement.scrollTop = this.contentMessages.nativeElement.scrollHeight;
        } catch(err) { }
    }

    getAllMessages(){
        this._messageService.getAllMessages(this.token).subscribe(
            
            response => {
                this.allMessages = response.allMessages;
                this.lastMessage = response.lastMessage;
                /*console.log(this.allMessages);
                console.log(this.lastMessage);*/
            },
            error => {
                console.log(<any>error)
            }
        );
    }

    getMessagesOnePeople(id_other){
        this._messageService.getMessagesOnePeople(this.token, id_other).subscribe(
            response => {
                this.allMessagesOnePeople = response.allMessages;
                this.name_other_people = response.name_other;
                this.id_other_person = response.id_other;
                //console.log(this.id_other_person);

                //this.message
            },
            error => {
                console.log(<any>error)
            }
        );

        this._messageService.changeToViewedMessages(this.token, id_other).subscribe(
            response => {
                console.log(response.messages)
            },
            error => {
                console.log(<any>error)
            }
        );
    }

    newMessage(form){
        //console.log(this.id_other_person);
        this.message.receiver = this.id_other_person;
        var status='';
        /*console.log(this.message);
        console.log(this.message.receiver);*/
        if (this.message.text != '') {
            this._messageService.addMessage(this.token, this.message).subscribe(
                response => {
                    if(response.message){
                        status = 'success';
                        form.reset();
                        this.getMessagesOnePeople(this.id_other_person);
                    } 
                },
                error => {
                    status = 'error';
                    console.log(<any>error)
                }
            );   
        }

        if(status == 'success'){
            this.message = new Message('', '', '', '', this.identity._id, '');
        }  
    }

    vaciarMensajes(){
        this.allMessagesOnePeople = undefined; 
    }

    onSubmit(form){
        this._messageService.addMessage(this.token, this.message_modal).subscribe(
            response => {
                if(response.message){
                    this.status = 'success';
                    form.reset();
                }
                
            },
            error => {
                this.status = 'error';
                console.log(<any>error)
            }
        );
    }

    getMyFollows(){
        this._followService.getMyFollows(this.token).subscribe(
            response => {
                this.follows = response.follows;
                console.log(this.follows);
            },
            error => {
                console.log(<any>error)
            }
        );
    }
}
  