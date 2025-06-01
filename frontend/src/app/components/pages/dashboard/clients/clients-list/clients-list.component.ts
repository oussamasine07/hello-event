import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {UserService} from '../../../../../services/user/user.service';
import {UserInterface} from '../../../../../models/interfaces/user';

@Component({
  selector: 'app-clients-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent implements OnInit {

  clients: UserInterface[] = [
    /*
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe'
    },
    {
      id: 2,
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      username: 'janesmith'
    }
     */
  ];

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'username', 'actions'];

  userService = inject(UserService)
  ngOnInit() {
    this.userService.getAllClients().subscribe({
      next: ( clients: UserInterface[] ) => {
        this.clients = clients
      }
    })
  }

  onDeleteClientClick ( id: number ) {
    this.clients = this.clients.filter( client => client.id != id )
    this.userService.deleteClient(id)
  }

}
