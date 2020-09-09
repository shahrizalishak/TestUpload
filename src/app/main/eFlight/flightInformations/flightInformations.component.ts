import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightInformationsServiceProxy, FlightInformationDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditFlightInformationModalComponent } from './create-or-edit-flightInformation-modal.component';
import { ViewFlightInformationModalComponent } from './view-flightInformation-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './flightInformations.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class FlightInformationsComponent extends AppComponentBase {

    @ViewChild('createOrEditFlightInformationModal', { static: true }) createOrEditFlightInformationModal: CreateOrEditFlightInformationModalComponent;
    @ViewChild('viewFlightInformationModalComponent', { static: true }) viewFlightInformationModal: ViewFlightInformationModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    destinationDepartureFilter = '';
    destinationArraivalFilter = '';
    maxDateFilter : moment.Moment;
		minDateFilter : moment.Moment;
    tImeDepartureFilter = '';
    timeArriavalFilter = '';
    maxFlightIdFilter : number;
		maxFlightIdFilterEmpty : number;
		minFlightIdFilter : number;
		minFlightIdFilterEmpty : number;




    constructor(
        injector: Injector,
        private _flightInformationsServiceProxy: FlightInformationsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getFlightInformations(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._flightInformationsServiceProxy.getAll(
            this.filterText,
            this.destinationDepartureFilter,
            this.destinationArraivalFilter,
            this.maxDateFilter,
            this.minDateFilter,
            this.tImeDepartureFilter,
            this.timeArriavalFilter,
            this.maxFlightIdFilter == null ? this.maxFlightIdFilterEmpty: this.maxFlightIdFilter,
            this.minFlightIdFilter == null ? this.minFlightIdFilterEmpty: this.minFlightIdFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createFlightInformation(): void {
        this.createOrEditFlightInformationModal.show();
    }

    deleteFlightInformation(flightInformation: FlightInformationDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._flightInformationsServiceProxy.delete(flightInformation.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._flightInformationsServiceProxy.getFlightInformationsToExcel(
        this.filterText,
            this.destinationDepartureFilter,
            this.destinationArraivalFilter,
            this.maxDateFilter,
            this.minDateFilter,
            this.tImeDepartureFilter,
            this.timeArriavalFilter,
            this.maxFlightIdFilter == null ? this.maxFlightIdFilterEmpty: this.maxFlightIdFilter,
            this.minFlightIdFilter == null ? this.minFlightIdFilterEmpty: this.minFlightIdFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
