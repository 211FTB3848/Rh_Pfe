package com.pfe.service;

 
import java.util.List;
import java.util.Set;

import com.pfe.model.Departement;
import com.pfe.model.Formation;
import com.pfe.model.Utilisateurs;

public interface FormationService {
 
 	List<Formation> findByDepartement(Departement departement);

	List<Formation> listFormation();
	Formation ajouterFormation(Formation formation, Long idDep);
	Formation findById(Long id);

 
	Formation ajoutrFormateur(Formation formation);

 

 
 
	Formation ajouterMembres(Long formationId, Long memberId);
}
