package com.spring.boot.backend.apirest.curso.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.boot.backend.apirest.curso.models.entity.Estudiante;

public interface IEstudianteDao extends JpaRepository<Estudiante, Long> {

	
}
