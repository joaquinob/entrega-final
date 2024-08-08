import { Pipe, PipeTransform } from '@angular/core';
import { UserAdmin } from '../interfaces/user-admin';

@Pipe({
  name: 'userFilter',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {

  transform(value: UserAdmin[], filtro: string): UserAdmin[] {
    return value.filter(x=> x.email.toLowerCase().includes(filtro)
     || x._id.toLocaleLowerCase().includes(filtro)
     ||  x.role.toLocaleLowerCase().includes(filtro)
     ||  x.username.toLocaleLowerCase().includes(filtro))
  
  }
}
