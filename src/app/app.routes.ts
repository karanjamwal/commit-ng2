import { provideRouter, RouterConfig }       from '@angular/router'; 

import { HomeComponent }            from './pages/home/home.component';
import { BulkDataComponent }        from './pages/bulkdata/bulkdata.component'
import { StaarComponent }           from './pages/staar/staar.component';
import { AeisComponent }            from './pages/aeis/aeis.component';
import { ScorecardComponent }       from './pages/scorecard/scorecard.component';
import { DonorsChooseComponent }    from './pages/donorschoose/donorschoose.component'; 

export const routes : RouterConfig  = [  
    { path: 'home',  component: HomeComponent },
    { path: 'bulkdata',  component: BulkDataComponent },
    { path: 'staar',  component: StaarComponent },
    { path: 'aeis',  component: AeisComponent },
    { path: 'scorecard',  component: ScorecardComponent },
    { path: 'donorschoose/:id',  component: DonorsChooseComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];