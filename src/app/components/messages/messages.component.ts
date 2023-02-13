import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages$!:Observable<string[]>
  constructor(protected messageService: MessageService) {
    this.messages$ = this.messageService.messages$;
  }
}
