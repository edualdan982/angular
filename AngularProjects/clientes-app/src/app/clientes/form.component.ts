import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  regiones: Region[];
  titulo: string = "CREAR CLIENTE";
  errores: string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
    this.cargarRegiones();
  }
  cargarCliente(): void{
    this.activatedRoute.params.subscribe(paramas => {
      let id = paramas['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
      }
    });
  }
  cargarRegiones(): void {
    this.clienteService.getRegiones().subscribe( regiones => this.regiones = regiones);
  }

  create(): void{
    console.log(this.cliente);
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo Cliente', `El Cliente "${cliente.nombre}" ha sido creado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.log('Código del error desde el Backend: ',err.status);
      console.log(err.error.errors);
    }
    );
  }

  update(): void{
    console.log(this.cliente);
    this.clienteService.update(this.cliente)
    .subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado',`${json.mensaje}: "${json.cliente.nombre}".`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Código del error desde el Backend: ',err.status);
        console.log(err.error.errors);
      }
    );
  }
  compararRegion(o1: Region, o2: Region): boolean{
    if(o1 === undefined && o2 === undefined)
      return true;
    return o1 === undefined ||o2 === undefined ||o1 === null || o2 === null? false: o1.id === o2.id;

  }
}
