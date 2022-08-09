import { SimuladorComponent } from './components/simulador/simulador.component';
import { VisualizadorComponent } from './components/visualizador/visualizador.component';
import { EditorComponent } from './components/editor/editor.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'visualizador',
    component: VisualizadorComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'simulador',
    component: SimuladorComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  //El siguiente path es una ruta comodín, cuando no sepa donde tiene que ir, vuelve a la home. SIEMPRE VA LA ÚLTIMA.
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
