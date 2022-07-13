import { Component } from "@angular/core";

@Component({
  selector: 'read-more',
  template: `
      <div [class.collapsed]="isCollapsed">
          <ng-content></ng-content>
      </div>
      <div (click)="isCollapsed = !isCollapsed">Read more</div>
  `,
  styles: [`
      div.collapsed {
          height: 250px;
          overflow: hidden;
      }
  `]
})

export class ReadMoreComponent {
  isCollapsed = true;
}