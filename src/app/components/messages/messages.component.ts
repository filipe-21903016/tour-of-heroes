import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../../shared/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  messages$!: Observable<string[]>;
  constructor(protected messageService: MessageService) {
    this.messages$ = this.messageService.messages$;
  }
}
