import { Injectable, Logger } from '@nestjs/common';
import { Transport, ClientProxy } from '@nestjs/microservices';
import { Client } from 'mqtt';
import { Observable, scan } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  // @Client({ transport: Transport.MQTT })

  public client: ClientProxy; 

  public async onModuleInit(): Promise<void> {
    Logger.log("Connecting");
    // await this.client.connect();
    Logger.log("Connected");
  }

  public sendMessage(): Observable<number> {
    const pattern: {} = { cmd: "sum" };
    const data: number[] = [5, 6];

    return this.client.send<number>(pattern, data);
  }


}
