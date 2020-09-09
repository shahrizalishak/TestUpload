import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TravelAgentsServiceProxy, CreateOrEditTravelAgentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';

@Component({
    selector: 'createOrEditTravelAgentModal',
    templateUrl: './create-or-edit-travelAgent-modal.component.html'
})
export class CreateOrEditTravelAgentModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    travelAgent: CreateOrEditTravelAgentDto = new CreateOrEditTravelAgentDto();



    constructor(
        injector: Injector,
        private _travelAgentsServiceProxy: TravelAgentsServiceProxy
    ) {
        super(injector);
    }

    show(travelAgentId?: number): void {

        if (!travelAgentId) {
            this.travelAgent = new CreateOrEditTravelAgentDto();
            this.travelAgent.id = travelAgentId;

            this.active = true;
            this.modal.show();
        } else {
            this._travelAgentsServiceProxy.getTravelAgentForEdit(travelAgentId).subscribe(result => {
                this.travelAgent = result.travelAgent;


                this.active = true;
                this.modal.show();
            });
        }
        
    }

    save(): void {
            this.saving = true;

			
            this._travelAgentsServiceProxy.createOrEdit(this.travelAgent)
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
