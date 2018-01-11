import { Injectable } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages/module/flash-messages.service";

@Injectable()
export class MessageService {

    constructor(private flashMessage: FlashMessagesService) {

    }

    success(message: string) {
        this.flashMessage.show(message, {cssClass: 'alert-success', timeout: 3000});
    }

    error(message: string) {
        this.flashMessage.show(message, {cssClass: 'alert-danger', timeout: 3000});
    }
}