import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Chat } from './features/chat/chat.component';

export const routes: Routes = [
  { path: '', component: Chat },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
