package com.spring.boot.backend.apirest.curso.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.boot.backend.apirest.curso.models.dao.IEstudianteDao;
import com.spring.boot.backend.apirest.curso.models.entity.Estudiante;

@Service
public class EstudianteServiceImpl implements IEstudianteService {
	
	@Autowired
	private IEstudianteDao estudianteDao;

	@Override
	@Transactional(readOnly = true)
	public List<Estudiante> findAll() {
		return estudianteDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Estudiante> findAll(Pageable pageable) {
		return estudianteDao.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Estudiante findById(Long id) {
		return estudianteDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Estudiante save(Estudiante estudiante) {
		return estudianteDao.save(estudiante);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		estudianteDao.deleteById(id);
	}
	

}
