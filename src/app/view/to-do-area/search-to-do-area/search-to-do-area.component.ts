import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-to-do-area',
  templateUrl: './search-to-do-area.component.html',
  styleUrls: ['./search-to-do-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchToDoAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
