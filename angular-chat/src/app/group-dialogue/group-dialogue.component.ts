import { Component, OnInit, HostBinding } from '@angular/core';
// import { MessageUserService } from '../services/message/message-user.service';
// import { IServerModel, IMessage } from '../data-interface';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { faSignOutAlt, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IUser, IServerModel, IUserRoom, IChatModel } from '../data-interface';
import { ChatRoomService } from '../services/chat-room/chat-room.service';

@Component({
  selector: 'app-group-dialogue',
  templateUrl: './group-dialogue.component.html',
  styleUrls: ['./group-dialogue.component.scss'],
})

export class GroupDialogueComponent implements OnInit {
  // public userName: string;
  // public userId: any;
  public userOwn: IUser;
  // public usersOnlineList = [];
  public users: Array<IUser>;
  public chats: Array<IUserRoom>;
  public chatModel: IChatModel;

  public logout = faSignOutAlt;
  public arrowBack = faArrowLeft;
  public addChat = faPlus;

  public sizeMonitor = false;

  public innerWidth: any;
  public innerHeight: any;

  public click = false;
  public roomId: number;

  constructor(
    // private messageService: MessageUserService,
    private userService: UserService,
    private router: Router,
    private chatService: ChatRoomService,
    private socketService: SocketService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if (this.innerWidth < 600) {
      this.sizeMonitor = true;
    }

    this.userOwn = this.userService.currentUserToken.user;

    this.userService.getUsers().subscribe((res: IServerModel) => {
      if (res.success) {
        this.users = res.items as IUser[];
      }
    });

    this.chatService.getChats(this.userOwn.id).subscribe((res: IServerModel) => {
      if (res.success) {
        this.chatService.chats.subscribe((resp) => {
          this.chats = resp as IUserRoom[];
        });
      }
    });

    // this.socketService.userNameOnline(null);

    // this.socketService.usersOnline.subscribe((res: any) => {
    //   this.usersOnlineList.push(res);
    // });
  }

  openChat(id) {
    this.roomId = id;
    this.click = !this.click;
  }

  onAddChat(user) {
    this.chatModel = {
      roomName: '',
      creatorId: this.userOwn.id,
      participator: []
    };

    if (user) {
      this.chatModel.roomName = user.login;
      this.chatModel.participator.push(user.id);
      this.chatModel.participator.push(this.userOwn.id);
    }

    this.chatService.createRoom(this.chatModel).subscribe((res: IServerModel) => {
      if (res.success) {
        this.chatService.chats.subscribe((resp) => {
          this.chats = resp as IUserRoom[];
        });
      }
    });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
