package com.pfe.repository;

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.Departement;
import com.pfe.model.Projet;
import com.pfe.model.TacheProjet;
import com.pfe.model.Utilisateurs;
 
 
public interface TacheProjetRepo extends JpaRepository<TacheProjet, Long> {
 List<TacheProjet> findByProjet(Projet projet);
 List<TacheProjet> findByEmployeur(Utilisateurs employeur);
List<TacheProjet> findByEmployeur_Departement(Departement departement);
}
