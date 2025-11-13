import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ENV } from '../core/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private serverUrl = `${ENV.apiUrl}`;

  constructor() {
    this.socket = io(this.serverUrl);
  }

  // sends an event to server
  send(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  // event listener function for any event, that will close the 
  on<T>(eventName: string): Observable<T> {
    return new Observable<T>((observer) => {
      const handler = (data: T) => observer.next(data);

      this.socket.on(eventName, handler);

      return () => this.socket.off(eventName, handler);
    });
  }

  // Disconnect socket
  disconnect() {
    this.socket.disconnect();
  }
}
