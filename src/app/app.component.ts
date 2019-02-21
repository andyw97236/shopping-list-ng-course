import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  loadedFeature = 'recipe';//recipe or shopping-list

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCPrH6s9nygy8m13JGc4Q1jQfTts6VqiBs",
      authDomain: "shopping-list-ng-course.firebaseapp.com",
      databaseURL: "https://shopping-list-ng-course.firebaseio.com"
    });
  }
}
