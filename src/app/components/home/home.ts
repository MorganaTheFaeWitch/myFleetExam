import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {serverConnector} from '../../services/serverConnector';
import {NgForOf} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-home',
  imports: [
    MatCard,
    NgForOf,
    MatFormField,
    MatLabel,
    MatSelect,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
    svr = serverConnector;
    data = this.svr.serverGetter();
    divisions = "";
    selected = "";

    private getDivisions = (json: any) => {
      let divisions = ["a"];
        for (let i = 0; i < json.length; i++) {
          let name = json[i].divisions;
        }
      return divisions;
    }
}
