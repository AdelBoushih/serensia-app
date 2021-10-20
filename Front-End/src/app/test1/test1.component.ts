import { Component, OnInit } from '@angular/core';

import { AppService } from '../services/app.service';

@Component({
  selector: 'test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css'],
})
export class Test1Component implements OnInit {
  constructor(private appService: AppService) {}

  term: string = '';
  number_suggestions: number = 1;
  choice: string = '';
  choices: string[] = [];
  suggestions?: string[];
  errorMessage: string = '';
  toastMessage: string = '';
  error: boolean = false;
  ngOnInit(): void {}

  send(): void {
    if (!this.term.trim() || !this.choices.length) return;

    console.log(this.term, this.choices, this.number_suggestions);
    this.appService
      .getSuggestions({
        term: this.term,
        number_suggestions: this.number_suggestions,
        choices: this.choices,
      })
      .subscribe(
        (data) => {
          this.suggestions = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addChoice() {
    if (!this.choice.includes(' ')) this.choices.push(this.choice);
    this.choice = '';
  }
}
