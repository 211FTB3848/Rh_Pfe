package com.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.Departement;

public interface DepartementRepo extends JpaRepository<Departement, Long>{

	boolean existsByNomDep(String nomDep);

	Departement findByNomDep(String nomDep);
}
