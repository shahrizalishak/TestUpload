import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetPurposeForViewDto, PurposeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewPurposeModal',
    templateUrl: './view-purpose-modal.component.html'
})
export class ViewPurposeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetPurposeForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetPurposeForViewDto();
        this.item.purpose = new PurposeDto();
    }

    show(item: GetPurposeForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
