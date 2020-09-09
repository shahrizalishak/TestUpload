import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { FlightInformationsServiceProxy, CreateOrEditFlightInformationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';

@Component({
    selector: 'createOrEditFlightInformationModal',
    templateUrl: './create-or-edit-flightInformation-modal.component.html'
})
export class CreateOrEditFlightInformationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    flightInformation: CreateOrEditFlightInformationDto = new CreateOrEditFlightInformationDto();



    constructor(
        injector: Injector,
        private _flightInformationsServiceProxy: FlightInformationsServiceProxy
    ) {
        super(injector);
    }

    show(flightInformationId?: number): void {

        if (!flightInformationId) {
            this.flightInformation = new CreateOrEditFlightInformationDto();
            this.flightInformation.id = flightInformationId;
            this.flightInformation.date = moment().startOf('day');

            this.active = true;
            this.modal.show();
        } else {
            this._flightInformationsServiceProxy.getFlightInformationForEdit(flightInformationId).subscribe(result => {
                this.flightInformation = result.flightInformation;


                this.active = true;
                this.modal.show();
            });
        }
        
    }

    save(): void {
            this.saving = true;

			
            this._flightInformationsServiceProxy.createOrEdit(this.flightInformation)
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
