import { TSocketEvent, WebsocketService } from 'services/websocket';
import { Inject } from 'services/core/injector';
import { UserService } from 'services/user';
import { InitAfter, StatefulService } from '../core';

interface IReactionsServiceState {
    
}

@InitAfter('UserService')
export class ReactionsService extends StatefulService<IReactionsServiceState> {
    @Inject() websocketService: WebsocketService;
    @Inject() userService: UserService;

    socket: SocketIOClient.Socket;

    async init() {
      this.initSocketConnection();
    }

    private initSocketConnection(): void {
      this.websocketService.socketEvent.subscribe(e => this.onSocketEvent(e));
    }

    private onSocketEvent(event: TSocketEvent) {
      this.log('Reaction Service: ', event);
    }

    private log(message: string, ...args: any[]) {
      console.debug(`Reaction Service: ${message}`, ...args);
    }
}