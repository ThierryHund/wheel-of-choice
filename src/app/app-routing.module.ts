import { ConfigComponent } from './components/config/config.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WheelComponent } from './components/wheel/wheel.component';

const routes: Routes = [
  { path: '', component: WheelComponent },
  { path: 'config', component: ConfigComponent },
  {
      path: '**',
      redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
