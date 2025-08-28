import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService, ChatMessage } from '../../core/chat.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./chat.css']
})
export class Chat implements OnInit {
  messageText = '';             // bound to the input box
  messages: ChatMessage[] = []; // list shown in the UI
  private sub?: Subscription;   // keep the subscription to clean up

  constructor(private chat: ChatService) {}

  ngOnInit(): void {
    // Start listening for server-broadcast messages when component mounts
    this.sub = this.chat.messages$().subscribe(msg => {
      this.messages.push(msg);
    });
  }


  send(): void {
    // Send to server and clear the input
    this.chat.sendMessage(this.messageText);
    this.messageText = '';
  }

  // Allow pressing Enter to send
  onKeydownEnter() {
    this.send();
  }
}
