import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { FlightsServiceProxy, CreateOrEditFlightDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { FlightTravelAgentLookupTableModalComponent } from './flight-travelAgent-lookup-table-modal.component';
import { FlightPurposeLookupTableModalComponent } from './flight-purpose-lookup-table-modal.component';
import { FlightJobTitleLookupTableModalComponent } from './flight-jobTitle-lookup-table-modal.component';

@Component({
    selector: 'createOrEditFlightModal',
    templateUrl: './create-or-edit-flight-modal.component.html'
})
export class CreateOrEditFlightModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('flightTravelAgentLookupTableModal', { static: true }) flightTravelAgentLookupTableModal: FlightTravelAgentLookupTableModalComponent;
    @ViewChild('flightPurposeLookupTableModal', { static: true }) flightPurposeLookupTableModal: FlightPurposeLookupTableModalComponent;
    @ViewChild('flightJobTitleLookupTableModal', { static: true }) flightJobTitleLookupTableModal: FlightJobTitleLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    flight: CreateOrEditFlightDto = new CreateOrEditFlightDto();

    travelAgentName = '';
    purposeName = '';
    jobTitleName = '';


    constructor(
        injector: Injector,
        private _flightsServiceProxy: FlightsServiceProxy
    ) {
        super(injector);
    }

    show(flightId?: number): void {

        if (!flightId) {
            this.flight = new CreateOrEditFlightDto();
            this.flight.id = flightId;
            this.flight.validationDate = moment().startOf('day');
            this.flight.approvalDate = moment().startOf('day');
            this.travelAgentName = '';
            this.purposeName = '';
            this.jobTitleName = '';

            this.active = true;
            this.modal.show();
        } else {
            this._flightsServiceProxy.getFlightForEdit(flightId).subscribe(result => {
                this.flight = result.flight;

                this.travelAgentName = result.travelAgentName;
                this.purposeName = result.purposeName;
                this.jobTitleName = result.jobTitleName;

                this.active = true;
                this.modal.show();
            });
        }
        
    }

    save(): void {
            this.saving = true;

			
            this._flightsServiceProxy.createOrEdit(this.flight)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

    openSelectTravelAgentModal() {
        this.flightTravelAgentLookupTableModal.id = this.flight.travelAgentId;
        this.flightTravelAgentLookupTableModal.displayName = this.travelAgentName;
        this.flightTravelAgentLookupTableModal.show();
    }
    openSelectPurposeModal() {
        this.flightPurposeLookupTableModal.id = this.flight.purposeId;
        this.flightPurposeLookupTableModal.displayName = this.purposeName;
        this.flightPurposeLookupTableModal.show();
    }
    openSelectJobTitleModal() {
        this.flightJobTitleLookupTableModal.id = this.flight.jobTitleId;
        this.flightJobTitleLookupTableModal.displayName = this.jobTitleName;
        this.flightJobTitleLookupTableModal.show();
    }


    setTravelAgentIdNull() {
        this.flight.travelAgentId = null;
        this.travelAgentName = '';
    }
    setPurposeIdNull() {
        this.flight.purposeId = null;
        this.purposeName = '';
    }
    setJobTitleIdNull() {
        this.flight.jobTitleId = null;
        this.jobTitleName = '';
    }


    getNewTravelAgentId() {
        this.flight.travelAgentId = this.flightTravelAgentLookupTableModal.id;
        this.travelAgentName = this.flightTravelAgentLookupTableModal.displayName;
    }
    getNewPurposeId() {
        this.flight.purposeId = this.flightPurposeLookupTableModal.id;
        this.purposeName = this.flightPurposeLookupTableModal.displayName;
    }
    getNewJobTitleId() {
        this.flight.jobTitleId = this.flightJobTitleLookupTableModal.id;
        this.jobTitleName = this.flightJobTitleLookupTableModal.displayName;
    }


    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
