import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  contactForm:FormGroup;
  successMessage: string | undefined;;
  errorMessage: string | undefined;
constructor(private fb:FormBuilder){
  this.contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });
}
/* onSubmit() {
  if (this.contactForm.invalid) {
    return; // Prevent submission if form is invalid
  }

  const formData = {
    ...this.contactForm.value,
    recipientEmail: 'semahegnk@gmail.com' // Replace with actual recipient email
  };

  this.http.post('https://your-email-service-api.com/api/send-email', formData)
    .subscribe({
      next: (response) => {
        this.successMessage = 'Email sent successfully!';
        this.contactForm.reset(); // Clear the form after successful submission
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while sending the email. Please try again later.';
        console.error('Error sending email:', error);
      }
    });
} */

  milestones = [
    { targetValue: 15, currentValue: 0, label: 'Happy Clients' },
    { targetValue: 10, currentValue: 0, label: 'Years Of Experience' },
    { targetValue: 20, currentValue: 0, label: 'Projects Completed' }
  ];

  private animationStarted = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const milestoneSection = document.getElementById('milestone');
    if (milestoneSection && this.isInViewport(milestoneSection) && !this.animationStarted) {
      this.startAnimation();
      this.animationStarted = true;
    }
  }

  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }

  startAnimation(): void {
    this.milestones.forEach((milestone) => {
      const step = Math.ceil(milestone.targetValue / 100);
      const interval = setInterval(() => {
        if (milestone.currentValue >= milestone.targetValue) {
          milestone.currentValue = milestone.targetValue;
          clearInterval(interval);
        } else {
          milestone.currentValue += step;
        }
      }, 50);
    });
  }

  
}
