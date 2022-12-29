import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {


  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService      
    ) { }

  registrarse(){
    const {email, name, password} = this.miFormulario.value;

    this.authService.registrar(email,name,password)
    .subscribe((ok)=>{
       if(ok===true){
          Swal.fire({
            title: "Usuario creado exitosamente",
            icon: 'success',
          });
          this.router.navigateByUrl('/login');
       }else{
          Swal.fire({
            title: ok,
            icon: 'error',
          })
       }
    })
    
  }


}
