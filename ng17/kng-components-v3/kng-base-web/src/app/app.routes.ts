import { Routes } from '@angular/router';
import { PersonsContentComponent } from '@persons/components/persons-content/persons-content.component';
import { ParametersContentComponent } from '@parameters/components/parameters-content/parameters-content.component';
import { HomeContentComponent } from './modules/home/components/home-content/home-content.component';

import { ArticleContentComponent } from  './modules/article/components/article-content/article-content.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeContentComponent },
  {
    path: 'persons',
    component: PersonsContentComponent
  },
  {
    path: 'parameters',
    component: ParametersContentComponent
  },

  { path: 'article', component: ArticleContentComponent },

];
