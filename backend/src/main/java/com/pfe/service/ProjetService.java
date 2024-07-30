package com.pfe.service;

import java.util.List;

import com.pfe.model.Departement;
import com.pfe.model.Projet;
import com.pfe.model.Utilisateurs;

public interface ProjetService {

	List<Projet> listProjets();
	List<Projet> findByResponsable(Utilisateurs responsable);
	Projet creeProjet(Projet projet);
	Projet modifierProjet(Projet projet);
 	Projet findById(Long id);
	List<Projet> findByChefProjet(Utilisateurs chefProjet);
	List<Projet> findByDep(Departement departement);
	void supprimerProjet(Long id);

}
