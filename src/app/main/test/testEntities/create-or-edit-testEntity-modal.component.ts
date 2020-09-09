import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TestEntitiesServiceProxy, CreateOrEditTestEntityDto,
     DemoUiComponentsServiceProxy, TestUploadDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { AppConsts } from '@shared/AppConsts';
import * as moment from 'moment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { IAjaxResponse } from '@abp/abpHttpInterceptor';

@Component({
    selector: 'createOrEditTestEntityModal',
    templateUrl: './create-or-edit-testEntity-modal.component.html',
    animations: [appModuleAnimation()]
})
export class CreateOrEditTestEntityModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    imageChangedEvent: any = '';
    testID;

    //New file upload
    uploadUrl: string;
    getUrl: string;
    deleteUrl: string;
    uploadedFiles: any[] = [];
    uploadedFiles2: any[] = [];

    testEntity: CreateOrEditTestEntityDto = new CreateOrEditTestEntityDto();



    constructor(
        injector: Injector,
        private _testEntitiesServiceProxy: TestEntitiesServiceProxy,
        private _httpClient: HttpClient,
        private http: HttpClient
    ) {
        super(injector);
        this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/TestUpload/UploadFiles';
        this.getUrl = AppConsts.remoteServiceBaseUrl + '/TestUploadH/DownloadFileH';
        this.deleteUrl = AppConsts.remoteServiceBaseUrl + '/TestUploadH/DeleteFile';
        console.log('Down URL : ' + this.getUrl);
        console.log('Upload URL : ' + this.uploadUrl);
    }

    show(testEntityId?: number): void {

        if (!testEntityId) {
            this.testEntity = new CreateOrEditTestEntityDto();
            this.testEntity.id = testEntityId;

            this.active = true;
            this.modal.show();
        } else {
            this._testEntitiesServiceProxy.getTestEntityForEdit(testEntityId).subscribe(result => {
                this.testEntity = result.testEntity;


                this.active = true;
                this.modal.show();
            });
        }
    }

    // upload completed event
    onUpload(event): void {
        const jsonResult = JSON.parse(event.xhr.response);
        console.log('Test json: '+ jsonResult);
        let attachment = new TestUploadDto();
        console.log('Upload File');
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    onBeforeSend(event): void {
        console.log('before send');
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
    }
    ////////////////////


    save(): void {
        this.saving = true;
        this._testEntitiesServiceProxy.createOrEdit(this.testEntity)
            .pipe(finalize(() => { this.saving = false; }))
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


