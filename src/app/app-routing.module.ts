import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './components/alunos/alunos.component';

const routes: Routes = [
  {path: 'aluno', component: AlunosComponent},
  {path: '', redirectTo: 'aluno', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
