package com.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.ChefAppartement;
import com.pfe.model.Departement;
  
public interface ChefAppartementRepo  extends JpaRepository<ChefAppartement, Long>{
	boolean existsByDepartement(Departement departement);
	List<ChefAppartement> findByDepartement(Departement departement);
}
