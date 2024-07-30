package com.pfe.repository;

 
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.Departement;
import com.pfe.model.Pointage;
import java.util.List;
import com.pfe.model.Utilisateurs;


 
 
public interface PointageRepo extends JpaRepository<Pointage, Long> {

	List<Pointage> findByEmployeur(Utilisateurs employeur);
 	List<Pointage> findByEmployeurDepartementId(Long department);
	List<Pointage> findByEmployeur_Departement(Departement departement);
}
