import { Component, Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DemoUiComponentsServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'demo-ui-file-upload',
    templateUrl: './demo-ui-file-upload.component.html',
    animations: [appModuleAnimation()]
})

export class DemoUiFileUploadComponent extends AppComponentBase {

    uploadUrl: string;
    uploadedFiles: any[] = [];

    constructor(
        injector: Injector,
        // private demoUiComponentsService: DemoUiComponentsServiceProxy
    ) {
        super(injector);
        this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/DemoUiComponents/UploadFiles';
        console.log('Demo Upload URL : '+ this.uploadUrl)
    }

    // upload completed event
    onUpload(event): void {
        console.log('Demo Upload 1')
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    onBeforeSend(event): void {
        console.log('Demo BeforeSend 1')
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
    }
}
