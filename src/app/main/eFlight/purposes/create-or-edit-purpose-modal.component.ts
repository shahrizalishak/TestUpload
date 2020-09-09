import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { PurposesServiceProxy, CreateOrEditPurposeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';

@Component({
    selector: 'createOrEditPurposeModal',
    templateUrl: './create-or-edit-purpose-modal.component.html'
})
export class CreateOrEditPurposeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    purpose: CreateOrEditPurposeDto = new CreateOrEditPurposeDto();



    constructor(
        injector: Injector,
        private _purposesServiceProxy: PurposesServiceProxy
    ) {
        super(injector);
    }

    show(purposeId?: number): void {

        if (!purposeId) {
            this.purpose = new CreateOrEditPurposeDto();
            this.purpose.id = purposeId;

            this.active = true;
            this.modal.show();
        } else {
            this._purposesServiceProxy.getPurposeForEdit(purposeId).subscribe(result => {
                this.purpose = result.purpose;


                this.active = true;
                this.modal.show();
            });
        }
        
    }

    save(): void {
            this.saving = true;

			
            this._purposesServiceProxy.createOrEdit(this.purpose)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
