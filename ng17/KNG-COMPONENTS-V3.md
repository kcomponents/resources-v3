![Kruger Corp](https://img.shields.io/badge/Kruger_Corp_®-Copyright_2022-blue)


# kng-components-v3

## k-layout

El Componente k-layout organiza los elementos de la página en el diseño estándar de las aplicaciones web con `angular 17`. El modulo KLayoutModule depende de librerías de terceros tales como `bootstrap4`, `primeng` con el tema de Bootstrap y `toastr`, los cuales deben ser incluidos.



```typescript
import { KLayoutComponent } from '@ec.com.kgr/kng-components-v3/k-layout';
 
 @Component({
   selector: 'app-parameters-content',
   standalone: true,
   templateUrl: './app-parameters-content.html',
   styleUrls: ['./app-parameters-content.scss'],
   imports: [
     KLayoutComponent
   ]
 })
export class ParametersContentComponent implements OnInit {...}

```

```html
<k-layout 
[appName]="'Proyecto Base'" 
[pageTitle]="'Administración de parámetros.'" 
[sidebarTemplate]="sidebarTemplate"
[headerTemplate]="headerTemplate" 
(logout)="logout()" 
[toolTipHomeText]="'Inicio'" 
[helpTemplate]="helpTemplate"
[titleHelpText]="'Ayuda del módulo parámetros'" 
[disableLoading]="false">
  <ng-container *ngTemplateOutlet="contentTemplate">
  </ng-container>
</k-layout>
```

* headerTemplate: Establece el nombre de la aplicación.
* pageTitle: Establece el título de la página.
* defaultCollapsed: Especifica true o false para definir si se mostrara colapsado por defecto de la barra lateral o no.
* cancelReload: Especifica true o false para definir si se activa la recarga de la página al presionar la tecla F5.
* disableLoading: Especifica true o false para definir si se desea activar la animación de cargando a la hora de realizar una petición ya sea: Consulta, inserción o actualización.
* showHeader: Especifica true o false para definir si se mostrará la cabecera del componente.
* showExit: Se especifica true o false para mostrar el botón de salida.
* showHome: Se especifica true o false para mostrar el botón de inicio.
* showHelp: Se especifica true o false para mostrar el botón de ayuda.
* showChat: Se especifica true o false para mostrar el botón de chat (k-chat).
* showWindowsManager: Especifica true o false para definir si se muestra la lista de sistemas abiertos (k-windows-manager).
* sidebarColumnNumbers: Establece el número de columnas que tomará la barra lateral (De 2 hasta 12).
* redirectUrl: Establece la url la cuál va ser redirigida desde la cabecera.
* imageHeader: Establece la url del ícono a mostrarse en la parte izquierda del header.
* disableLinkHome: Tanto el ícono como el nombre se deshabilitan o habilitan.  

 

