import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {map, Observable} from "rxjs";
import {IUser} from "../../inerface";
import {GET_ALL_USERS, IGET_ALL_USERS} from "./gql/get-all-users";
import {UsersService} from "./users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users$?: Observable<IUser[]>
  isNew: boolean = false

  constructor(
    private readonly usersService: UsersService,
    private readonly router:Router
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.usersService.getAllUsers()
  }

  isNewTrigger(): void {
    this.isNew = !this.isNew
  }

  onSubmit(user: IUser) {
    const { email, name } = user
    this.usersService.createUser(name, email).subscribe(user => {
      if (user) {
        this.isNewTrigger()
        this.router.navigate(['/users', user.id])
      }
    })
  }
}
