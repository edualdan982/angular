import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJs from 'sockjs-client';
import { Mensaje } from './models/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  private client: Client;
  public conectado = false;
  public mensaje: Mensaje = new Mensaje();
  mensajes: Mensaje[] = [];
  constructor() {}

  ngOnInit(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJs('http://localhost:8087/chat-websocket');
    };
    this.client.onConnect = (frame) => {
      console.log('Conectados: ' + this.client.connected + ' : ' + frame);
      this.conectado = true;

      this.client.subscribe('/chat/mensaje', (e) => {
        const mensaje: Mensaje = JSON.parse(e.body) as Mensaje;
        mensaje.fecha = new Date(mensaje.fecha);
        if (!this.mensaje.color && mensaje.tipo === 'NUEVO_USUARIO' && this.mensaje.username === mensaje.username){
          this.mensaje.color = mensaje.color;
        }

        this.mensajes.push(mensaje);
        console.log(mensaje);
      });
      this.mensaje.tipo = 'NUEVO_USUARIO';
      this.client.publish({
        destination: '/app/mensaje',
        body: JSON.stringify(this.mensaje),
      });
    };
    this.client.onDisconnect = (frame) => {
      console.log('Desconectados: ' + !this.client.connected + ' : ' + frame);
      this.conectado = false;
    };
  }

  public conectar(): void {
    this.client.activate();
    this.conectado = true;
  }
  public desconectar(): void {
    this.client.deactivate();
    this.conectado = false;
  }
  public enviarMensaje(): void {
    this.mensaje.tipo = 'MENSAJE';
    this.client.publish({
      destination: '/app/mensaje',
      body: JSON.stringify(this.mensaje),
    });
    this.mensaje.texto = '';
  }
}
