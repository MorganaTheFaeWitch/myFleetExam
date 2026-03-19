import {AfterViewInit, Component, OnInit} from '@angular/core';
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
    public divisions : Array<string> = []; // this wasent used in the end

    ngOnInit() {
      // this.divisions = this.getDivisions(this.data);
      this.totalDistance = this.caculateKM("");
      this.divisions = this.getDivisions(this.data);
    }

    // caculates the distance traveled for the fleet or division, it should be caculateKM(selected : string?) to allow for null inputs rather than always expecting a string
    // however I only realised after, and adding extra comments
    public caculateKM(selected : string){
      let total = 0;
      for (let i = 0; i < this.data.fleet.length; i++) {
        if( this.data.fleet[i].division == selected || selected == ""){
          total += +this.data.fleet[i].kilometers_travelled;
        }
      }
      return total;
    }

    // this was never actually used, the idea was to scrape the divisions from the fleet itself without requiring a discrete array for divisions,
    // however, i couldent determin if this was breaking or the dropdown was, so this was the first to be scrapped, I do believe it would work tho,
    // its just untested
    private getDivisions = (rawdta: any) => {
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
      try{
        let ListOfDivs = rawdta.fleet;
        // this was found on this GeeksForGeeks article, https://www.geeksforgeeks.org/javascript/how-to-get-distinct-values-from-an-array-of-objects-in-javascript/
        let rawdivs = ListOfDivs.filter((obj: { division: any; }, index: any, self: { division: any; }[]) => index === self.findIndex((t: { division: any; }) => t.division === obj.division));
        let divisions = [];
        for (let i = 0; i < rawdivs.length; i++) {
          divisions.push(rawdivs[i].division);
        }
        return divisions;
      }
      catch (e) {
        console.log(e);
      }
      return [];
    }
}
