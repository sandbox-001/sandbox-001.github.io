import { Component, inject } from '@angular/core';
import { Dates } from './services/dates';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-christmas',
  imports: [DatePipe],
  templateUrl: './christmas.html',
  styleUrl: './christmas.scss',
})
export class Christmas {
  dates = inject(Dates)

}
