import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { IServerModel } from '../data-interface';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public createForm: FormGroup;
  public errorMessage: string;

  constructor( private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      email: new FormControl('',
        [Validators.required, Validators.pattern(/^[\D]+@[a-z]{2,}\.[a-z]{2,}/g)]),
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onCreate() {
    const formValue = this.createForm.value;
    formValue.role = 'user';

    this.userService.createUser(formValue)
    .subscribe((res: IServerModel) => {
      if (res.success) {
        this.router.navigate(['/chat-list']);
      } else {
        this.errorMessage = res.message;
      }
    });
  }

  onCancel() {
    this.router.navigate(['']);
  }
}
