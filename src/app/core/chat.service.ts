import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

// Small message shape useed throughout the app
export interface ChatMessage {
  text: string;     // the actual chat text the user typed
  time: string;     // ISO timestamp from the server
  id?: string;      // optional: socket id (who sent it)
}

@Injectable({ providedIn: 'root' })
export class ChatService implements OnDestroy {
  // Keep a single socket connection for the whole app lifetime.
  private socket: Socket;

  constructor() {
    // Connect to our Node/Socket.IO server
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'], // fallback if websockets blocked
    });
  }

  // Emit a message to the server; the server will broadcast to everyone
  sendMessage(text: string) {
    const trimmed = text?.trim();
    if (!trimmed) return;
    this.socket.emit('chat:message', trimmed);
  }

  messages$(): Observable<ChatMessage> {
  return new Observable<ChatMessage>(subscriber => {
    this.socket.on('chat:message', subscriber.next.bind(subscriber));
  });
}

  ngOnDestroy(): void {
    // If the service ever gets destroyed, close the socket
    this.socket?.disconnect();
  }
}
