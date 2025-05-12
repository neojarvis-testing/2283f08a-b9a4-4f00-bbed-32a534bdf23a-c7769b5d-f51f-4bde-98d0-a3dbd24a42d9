import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularapp';
  currentUrl:string=''
  constructor(private router: Router) {   
  }
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  isLandingPage():boolean{
    return this.currentUrl === '/';
  }
  modalTitle: string = '';
modalContent: string = '';

setModalContent(section: string) {
    switch (section) {
        case 'plans':
            this.modalTitle = 'Personalized Plans';
            this.modalContent = 'FitnessTracker provides customized workout plans designed to match your fitness level and goals.';
            break;
        case 'progress':
            this.modalTitle = 'Track Your Progress';
            this.modalContent = 'Monitor your journey with detailed analytics.';
            break;
        case 'guidance':
            this.modalTitle = 'Expert Guidance';
            this.modalContent = 'Get advice from certified trainers to optimize your workouts.';
            break;
        default:
            this.modalTitle = 'FitnessTracker';
            this.modalContent = 'Select a section to learn more.';
    }
}
}