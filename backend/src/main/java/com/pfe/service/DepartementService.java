package com.pfe.service;

import java.util.List;

import com.pfe.model.Departement;

public interface DepartementService {

	List<Departement> listDepartements();
 	Departement findByIdDepartement(Long id);
	void deletDepartement(Long id);
 	Departement saveOrUpdateDepartement(Departement departement);
}
