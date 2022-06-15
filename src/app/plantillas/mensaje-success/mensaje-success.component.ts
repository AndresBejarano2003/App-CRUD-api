import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje-success',
  templateUrl: './mensaje-success.component.html',
  styleUrls: ['./mensaje-success.component.scss']
})
export class MensajeSuccessComponent implements OnInit {

  @Input() mensaje!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
