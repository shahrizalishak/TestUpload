import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsServiceProxy, FlightDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditFlightModalComponent } from './create-or-edit-flight-modal.component';
import { ViewFlightModalComponent } from './view-flight-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './flights.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class FlightsComponent extends AppComponentBase {

    @ViewChild('createOrEditFlightModal', { static: true }) createOrEditFlightModal: CreateOrEditFlightModalComponent;
    @ViewChild('viewFlightModalComponent', { static: true }) viewFlightModal: ViewFlightModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    detailFilter = '';
    nameFilter = '';
    nricFilter = '';
    staffIDFilter = '';
    positionFilter = '';
    emailFilter = '';
    phoneNoFilter = '';
    membershipNoFilter = '';
    validationNameFilter = '';
    validationPhoneNoFilter = '';
    validationPositionFilter = '';
    maxValidationDateFilter : moment.Moment;
		minValidationDateFilter : moment.Moment;
    validationFilter = -1;
    approvalNameFilter = '';
    approvalPositionFilter = '';
    maxApprovalDateFilter : moment.Moment;
		minApprovalDateFilter : moment.Moment;
    approvalFilter = -1;
        travelAgentNameFilter = '';
        purposeNameFilter = '';
        jobTitleNameFilter = '';




    constructor(
        injector: Injector,
        private _flightsServiceProxy: FlightsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getFlights(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._flightsServiceProxy.getAll(
            this.filterText,
            this.detailFilter,
            this.nameFilter,
            this.nricFilter,
            this.staffIDFilter,
            this.positionFilter,
            this.emailFilter,
            this.phoneNoFilter,
            this.membershipNoFilter,
            this.validationNameFilter,
            this.validationPhoneNoFilter,
            this.validationPositionFilter,
            this.maxValidationDateFilter,
            this.minValidationDateFilter,
            this.validationFilter,
            this.approvalNameFilter,
            this.approvalPositionFilter,
            this.maxApprovalDateFilter,
            this.minApprovalDateFilter,
            this.approvalFilter,
            this.travelAgentNameFilter,
            this.purposeNameFilter,
            this.jobTitleNameFilter,
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

    createFlight(): void {
        this.createOrEditFlightModal.show();
    }

    deleteFlight(flight: FlightDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._flightsServiceProxy.delete(flight.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._flightsServiceProxy.getFlightsToExcel(
        this.filterText,
            this.detailFilter,
            this.nameFilter,
            this.nricFilter,
            this.staffIDFilter,
            this.positionFilter,
            this.emailFilter,
            this.phoneNoFilter,
            this.membershipNoFilter,
            this.validationNameFilter,
            this.validationPhoneNoFilter,
            this.validationPositionFilter,
            this.maxValidationDateFilter,
            this.minValidationDateFilter,
            this.validationFilter,
            this.approvalNameFilter,
            this.approvalPositionFilter,
            this.maxApprovalDateFilter,
            this.minApprovalDateFilter,
            this.approvalFilter,
            this.travelAgentNameFilter,
            this.purposeNameFilter,
            this.jobTitleNameFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
