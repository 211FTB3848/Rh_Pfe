package com.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pfe.model.Conge;
import com.pfe.model.Departement;
import com.pfe.model.Utilisateurs;

public interface CongeRepo extends JpaRepository<Conge, Long> {
    List<Conge> findByEmployeur(Utilisateurs employeur);
    List<Conge> findByEmployeur_Departement_Id(Long departementId);
	List<Conge> findByEmployeur_Departement(Departement departement);
}
