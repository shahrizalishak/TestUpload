import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestEntitiesComponent } from './test/testEntities/testEntities.component';
import { FlightsComponent } from './eFlight/flights/flights.component';
import { TravelAgentsComponent } from './eFlight/travelAgents/travelAgents.component';
import { FlightInformationsComponent } from './eFlight/flightInformations/flightInformations.component';
import { JobTitlesComponent } from './eFlight/jobTitles/jobTitles.component';
import { PurposesComponent } from './eFlight/purposes/purposes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'test/testEntities', component: TestEntitiesComponent, data: { permission: 'Pages.TestEntities' }  },
                    { path: 'eFlight/flights', component: FlightsComponent, data: { permission: 'Pages.Flights' }  },
                    { path: 'eFlight/travelAgents', component: TravelAgentsComponent, data: { permission: 'Pages.TravelAgents' }  },
                    { path: 'eFlight/flightInformations', component: FlightInformationsComponent, data: { permission: 'Pages.FlightInformations' }  },
                    { path: 'eFlight/jobTitles', component: JobTitlesComponent, data: { permission: 'Pages.JobTitles' }  },
                    { path: 'eFlight/purposes', component: PurposesComponent, data: { permission: 'Pages.Purposes' }  },
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
