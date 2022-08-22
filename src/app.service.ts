import { Inject, Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, MqttRecordBuilder, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('TEST_CLIENT') private client: ClientProxy,){}
  
  // getHello(): string {
  //   return 'Hello World!';
  // }

  sumDataService(payload:number[]) {
    const response = payload.reduce((a,b) => a + b, 0);
    const record = new MqttRecordBuilder(`${response}`)
      .setQoS(1)
      .build();
      this.client.send('ftf_output', record).subscribe(res => {
        console.log('response output: <', res, '>');
      });
  }
}
