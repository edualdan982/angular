package com.spring.jpa.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.spring.jpa.entity.Cliente;

@XmlRootElement(name = "clientes")
public class ClienteList {

	@XmlElement(name = "cliente")
	public List<Cliente> clientes;

	public ClienteList() {
	}

	public ClienteList(List<Cliente> clientes) {
		this.clientes = clientes;
	}

	public List<Cliente> getClientes() {
		return clientes;
	}

}
