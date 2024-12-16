import { Routes } from '@angular/router';
import { AddStaffComponent } from './Component/Page/Staff/Staff_Add/addStaff.component';
import { ListStaffComponent } from './Component/Page/Staff/Staff_List/listStaff.component';
import { EditStaffComponent } from './Component/Page/Staff/Staff_Edit/editStaff.component';
import { ViewStaffComponent } from './Component/Page/Staff/Staff_View/viewStaff.component';
import { WhoAmIComponent } from './Component/Page/ResearchLab/WhoAmI/WhoAmI.component';
import { IAmComponent } from './Component/Page/ResearchLab/IAm/IAm.component';
import { CounterComponent } from './Component/Page/ResearchLab/Counter/Counter.component';
import { AuthComponent } from './Component/Page/Auth/Encryption/encryption.component';

export const routes: Routes = [
    { path: '', component: ListStaffComponent },
    // { path: '/', component: ListStaffComponent },
    { path: 'list', component: ListStaffComponent },
    { path: 'list/', component: ListStaffComponent },

    { path: 'add', component: AddStaffComponent },
    { path: 'add/', component: AddStaffComponent },
    
    { path: 'edit/:id', component: EditStaffComponent },
    { path: 'view/:id', component: ViewStaffComponent },

    { path: 'ResearchLab/IAm', component: IAmComponent},
    { path: 'ResearchLab/IAm/', component: IAmComponent},
    { path: 'ResearchLab/WhoAmI', component: WhoAmIComponent},
    { path: 'ResearchLab/WhoAmI/', component: WhoAmIComponent},
    { path: 'ResearchLab/Counter', component: CounterComponent},
    { path: 'ResearchLab/Counter/', component: CounterComponent},

    { path: 'Auth/Encryption', component: AuthComponent},
    { path: 'Auth/Encryption/', component: AuthComponent},
];

