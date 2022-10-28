import { Component, ViewChild } from '@angular/core';

import { PoMenuItem, PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('modalVisualizar', { static: true }) modalVisualizar!: PoModalComponent;

  aMenus      : Array<PoMenuItem> = []

  ngOnInit() {
    this.aMenus = [
      { label: 'Alunos', link: '/alunos', icon: 'po-icon po-icon-users', shortLabel: 'Alunos' }
    ];
  }



}
