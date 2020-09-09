import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { JobTitlesServiceProxy, CreateOrEditJobTitleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';

@Component({
    selector: 'createOrEditJobTitleModal',
    templateUrl: './create-or-edit-jobTitle-modal.component.html'
})
export class CreateOrEditJobTitleModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    jobTitle: CreateOrEditJobTitleDto = new CreateOrEditJobTitleDto();



    constructor(
        injector: Injector,
        private _jobTitlesServiceProxy: JobTitlesServiceProxy
    ) {
        super(injector);
    }

    show(jobTitleId?: number): void {

        if (!jobTitleId) {
            this.jobTitle = new CreateOrEditJobTitleDto();
            this.jobTitle.id = jobTitleId;

            this.active = true;
            this.modal.show();
        } else {
            this._jobTitlesServiceProxy.getJobTitleForEdit(jobTitleId).subscribe(result => {
                this.jobTitle = result.jobTitle;


                this.active = true;
                this.modal.show();
            });
        }
        
    }

    save(): void {
            this.saving = true;

			
            this._jobTitlesServiceProxy.createOrEdit(this.jobTitle)
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
