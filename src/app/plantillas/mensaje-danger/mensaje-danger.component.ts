import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje-danger',
  templateUrl: './mensaje-danger.component.html',
  styleUrls: ['./mensaje-danger.component.scss']
})
export class MensajeDangerComponent implements OnInit {

  @Input() mensaje!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
