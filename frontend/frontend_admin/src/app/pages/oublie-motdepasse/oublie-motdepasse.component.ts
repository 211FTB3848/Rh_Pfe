import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordResetService } from 'src/app/_MonServices/motdepasseoublie.service';

@Component({
  selector: 'app-oublie-motdepasse',
  templateUrl: './oublie-motdepasse.component.html',
  styleUrls: ['./oublie-motdepasse.component.css']
})
export class OublieMotdepasseComponent{ 
  email: string = '';

  constructor(private passwordResetService: PasswordResetService, private router: Router) { }

  onSubmit() {
    this.passwordResetService.requestPasswordReset(this.email).subscribe((data:any)=>{
      console.log(data)
    })
       
  }
}