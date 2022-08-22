// import { Controller } from "@nestjs/common";
// import { MessagePattern, Payload } from "@nestjs/microservices";

// @Controller('math')
// export class MqttController {
//     @MessagePattern('notification_chanel')
//     getNotifications(@Payload() data:string) {
//         console.log(data);
//         return 'this msg from client:${data}'
//     }
// }