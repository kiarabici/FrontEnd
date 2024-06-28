import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeveloperService} from '../services/developer.service';
import { Developers } from '../services/developers';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss']
})

export class DevelopersComponent implements OnInit,OnDestroy {
  developers:Developers[]=[]




  constructor(private DeveloperService: DeveloperService,)  {

}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
