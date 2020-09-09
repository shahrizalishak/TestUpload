import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetFlightForViewDto, FlightDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewFlightModal',
    templateUrl: './view-flight-modal.component.html'
})
export class ViewFlightModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetFlightForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetFlightForViewDto();
        this.item.flight = new FlightDto();
    }

    show(item: GetFlightForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
