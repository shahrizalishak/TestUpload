import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { TestEntitiesComponent } from './test/testEntities/testEntities.component';
import { ViewTestEntityModalComponent } from './test/testEntities/view-testEntity-modal.component';
import { CreateOrEditTestEntityModalComponent } from './test/testEntities/create-or-edit-testEntity-modal.component';

import { FlightsComponent } from './eFlight/flights/flights.component';
import { ViewFlightModalComponent } from './eFlight/flights/view-flight-modal.component';
import { CreateOrEditFlightModalComponent } from './eFlight/flights/create-or-edit-flight-modal.component';
import { FlightTravelAgentLookupTableModalComponent } from './eFlight/flights/flight-travelAgent-lookup-table-modal.component';
import { FlightPurposeLookupTableModalComponent } from './eFlight/flights/flight-purpose-lookup-table-modal.component';
import { FlightJobTitleLookupTableModalComponent } from './eFlight/flights/flight-jobTitle-lookup-table-modal.component';

import { TravelAgentsComponent } from './eFlight/travelAgents/travelAgents.component';
import { ViewTravelAgentModalComponent } from './eFlight/travelAgents/view-travelAgent-modal.component';
import { CreateOrEditTravelAgentModalComponent } from './eFlight/travelAgents/create-or-edit-travelAgent-modal.component';

import { FlightInformationsComponent } from './eFlight/flightInformations/flightInformations.component';
import { ViewFlightInformationModalComponent } from './eFlight/flightInformations/view-flightInformation-modal.component';
import { CreateOrEditFlightInformationModalComponent } from './eFlight/flightInformations/create-or-edit-flightInformation-modal.component';

import { JobTitlesComponent } from './eFlight/jobTitles/jobTitles.component';
import { ViewJobTitleModalComponent } from './eFlight/jobTitles/view-jobTitle-modal.component';
import { CreateOrEditJobTitleModalComponent } from './eFlight/jobTitles/create-or-edit-jobTitle-modal.component';

import { PurposesComponent } from './eFlight/purposes/purposes.component';
import { ViewPurposeModalComponent } from './eFlight/purposes/view-purpose-modal.component';
import { CreateOrEditPurposeModalComponent } from './eFlight/purposes/create-or-edit-purpose-modal.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { ModalModule, TabsModule, TooltipModule, BsDropdownModule, PopoverModule } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BsDatepickerModule, BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
    imports: [
		FileUploadModule,
		AutoCompleteModule,
		PaginatorModule,
		EditorModule,
		InputMaskModule,		TableModule,

        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        MainRoutingModule,
        CountoModule,
        NgxChartsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        PopoverModule.forRoot()
    ],
    declarations: [
		TestEntitiesComponent,
		ViewTestEntityModalComponent,		CreateOrEditTestEntityModalComponent,
		FlightsComponent,
		ViewFlightModalComponent,		CreateOrEditFlightModalComponent,
    FlightTravelAgentLookupTableModalComponent,
    FlightPurposeLookupTableModalComponent,
    FlightJobTitleLookupTableModalComponent,
		TravelAgentsComponent,
		ViewTravelAgentModalComponent,		CreateOrEditTravelAgentModalComponent,
		FlightInformationsComponent,
		ViewFlightInformationModalComponent,		CreateOrEditFlightInformationModalComponent,
		JobTitlesComponent,
		ViewJobTitleModalComponent,		CreateOrEditJobTitleModalComponent,
		PurposesComponent,
		ViewPurposeModalComponent,		CreateOrEditPurposeModalComponent,
        DashboardComponent
    ],
    providers: [
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale }
    ]
})
export class MainModule { }
