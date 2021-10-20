import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
})
export class Test2Component implements OnInit {
  constructor(private appService: AppService) {}

  emails?: string[];
  file?: string;

  maxDepth = 0;

  ngOnInit(): void {}

  send() {
    console.log(this.file);
  }

  getEmails(): void {
    if (this.file && this.maxDepth >= 0)
      this.appService
        .getEmails({ url: this.file, maxDepth: this.maxDepth })
        .subscribe(
          (data) => {
            this.emails = data;
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
  }
}
