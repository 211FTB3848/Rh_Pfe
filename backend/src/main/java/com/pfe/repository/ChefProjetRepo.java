package com.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

 import com.pfe.model.ChefProjet;
import com.pfe.model.Departement;

public interface ChefProjetRepo extends JpaRepository<ChefProjet, Long> {
	boolean existsByDepartement(Departement departement);
	List<ChefProjet> findByDepartement(Departement departement);
}
