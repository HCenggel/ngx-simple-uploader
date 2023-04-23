import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'test', loadChildren: () => import('./pages/test/test.module').then(m => m.TestModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
