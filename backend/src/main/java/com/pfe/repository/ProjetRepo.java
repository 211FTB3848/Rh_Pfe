package com.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.Departement;
import com.pfe.model.Projet;
import com.pfe.model.Utilisateurs;
import com.pfe.model.ChefProjet;
import java.util.Date;

 
public interface ProjetRepo extends JpaRepository<Projet, Long> {
 
 	List<Projet> findByChefProjet(Utilisateurs chefProjet);
	List<Projet> findByDepartement(Departement departement);
	boolean existsByChefProjetAndDatedebut(ChefProjet chefProjet, Date datedebut);

 }
