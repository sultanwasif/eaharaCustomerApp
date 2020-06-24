import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: "./login/login.module#LoginModule"
  },
  { path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  { path: "", loadChildren: "./forgetpassword/forgetpassword.module#ForgetpasswordModule" }
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
