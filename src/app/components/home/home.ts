import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {serverConnector} from '../../services/serverConnector';
import {NgForOf} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-home',
  imports: [
    MatCard,
    NgForOf,
    MatFormField,
    MatLabel,
    MatSelect,
    MatCardHeader,
    MatCardContent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
    private svr = serverConnector;  //initalising the server connector
    public data = this.svr.serverGetter(); //grabbing the data from the "server"
    public totalDistance = 0;

    ngOnInit() {
      // this.divisions = this.getDivisions(this.data);
      this.totalDistance = this.caculateKM("");
    }

    public caculateKM(selected : string){
      let total = 0;
      for (let i = 0; i < this.data.fleet.length; i++) {
        if( this.data.fleet[i].division == selected || selected == ""){
          total += +this.data.fleet[i].kilometers_travelled;
        }
      }
      return total;
    }


    private getDivisions = (json: any) => {
      // let lookup = {};
      // let dict = [];
      //   for (let i = 0; i < json.length; i++) {
      //     let name = json[i].divisions;
      //     if (!(name in lookup)) {
      //       lookup[name] = 1;
      //       dict.push(name);
      //     }
      //   }
      // return divisions;
      //console.log(json.filter((obj: { id: any; }, index: any, self: any[]) => index === self.findIndex((t) => t.id === obj.id)));
      // @ts-ignore
      return Array.from(new Set(json.map(obj => JSON.stringify(obj)))).map(e => JSON.parse(e));
    }
  protected readonly DateAdapter = DateAdapter;
}
