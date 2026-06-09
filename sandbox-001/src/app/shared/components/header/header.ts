import { Component } from '@angular/core';
import { ANGULAR_MATERIAL } from '../modules/angular-material.module';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [ANGULAR_MATERIAL, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
