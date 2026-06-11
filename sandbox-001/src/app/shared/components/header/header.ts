import { Component } from '@angular/core';
import { ANGULAR_MATERIAL_MODULES } from '../../modules/angular-material.module';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [ANGULAR_MATERIAL_MODULES, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
