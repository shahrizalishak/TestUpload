import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import {
    TestEntitiesServiceProxy, CreateOrEditTestEntityDto,
    DemoUiComponentsServiceProxy, TestUploadDto
} from '@shared/service-proxies/service-proxies';
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
    getUrlTemp: string;
    deleteUrl: string;
    uploadedFiles: any[] = [];
    uploadedFiles2: any[] = [];
    file: TestUploadDto[] = [];
    files: any;
    arrIdFile = [];

    testEntity: CreateOrEditTestEntityDto = new CreateOrEditTestEntityDto();



    constructor(
        injector: Injector,
        private _testEntitiesServiceProxy: TestEntitiesServiceProxy,
        private _httpClient: HttpClient,
        private http: HttpClient
    ) {
        super(injector);
        this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/TestUpload/UploadFiles';
        this.getUrl = AppConsts.remoteServiceBaseUrl + '/TestUpload/DownloadFile';
        this.getUrlTemp = AppConsts.remoteServiceBaseUrl + '/TestUpload/DownloadFileTemp';
        this.deleteUrl = AppConsts.remoteServiceBaseUrl + '/TestUploadH/DeleteFileH';
        this.uploadedFiles2 = [];
        console.log('Down URL : ' + this.getUrl);
        console.log('Upload URL : ' + this.uploadUrl);
    }

    show(testEntityId?: number): void {

        if (!testEntityId) {
            this.testEntity = new CreateOrEditTestEntityDto();
            this.testEntity.id = testEntityId;
            this.uploadedFiles2 = [];
            this.arrIdFile = [];
            this.active = true;
            this.modal.show();
        } else {
            this._testEntitiesServiceProxy.getTestEntityForEdit(testEntityId).subscribe(result => {
                this.testEntity = result.testEntity;
                this.uploadedFiles2 = [];
                this.arrIdFile = [];
                this.active = true;
                this.modal.show();
            });
        }
    }

    // upload completed event

    onUpload(event): void {
        console.log('Upload File');
        this.files = event.originalEvent.body.result;
        console.log(this.files);
        // for (const file of event.files) {
        //     this.uploadedFiles.push(file);
        // }
        for (let file of this.files) {
            this.uploadedFiles2.push(file);
            console.log(file.id);
            this.arrIdFile.push(file.id);
        }
        this.testEntity.testUploadListID = this.arrIdFile;
        console.log(this.testEntity);
    }

    onBeforeSend(event): void {
        console.log('before send');
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
    }

    onDeleteAttachmentTemp(id: string) {
        // const index: number = this.uploadedFiles2.indexOf(id);
        const indexi = this.uploadedFiles2.findIndex(x => x.id === id);
        console.log('delete attachment' + indexi);
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._testEntitiesServiceProxy.deleteAttachmentTemp(id).subscribe(result => {
                        this.uploadedFiles2.splice(indexi, 1);
                        this.arrIdFile.splice(indexi, 1);
                    });
                }
            }
        );
    }

    onDeleteAttachment(id: string) {
        const index = this.testEntity.tempUpload.findIndex(x => x.id === id);
        const indexi = this.uploadedFiles2.findIndex(x => x.id === id);
        console.log('delete attachment' + index);
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._testEntitiesServiceProxy.deleteAttachment(id).subscribe(result => {
                        this.testEntity.tempUpload.splice(index, 1);
                    });
                    //hhh
                    // this._testEntitiesServiceProxy.getTestEntityForEdit(testId).subscribe(result => {
                    //     this.testEntity = result.testEntity;
                    //     console.log('delete attachment' + this.testEntity);
                    // });
                }
            }
        );
    }
    ////////////////////


    save(): void {
        this.saving = true;
        console.log('TestEntity : ' + this.testEntity);
        console.log('Save : ' + this.testEntity.testUpload);
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



