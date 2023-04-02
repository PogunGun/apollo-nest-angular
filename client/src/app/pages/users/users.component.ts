import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {map, Observable} from "rxjs";
import {IUser} from "../../inerface";
import {GET_ALL_USERS, IGET_ALL_USERS} from "./gql/get-all-users";
import {UsersService} from "./users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit{
  users$?:Observable<IUser[]>
  constructor(
    private readonly usersService:UsersService
  ) {
  }
  ngOnInit():void{
    this.users$ =this.usersService.getAllUsers()
  }
}