package com.pfe.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.pfe.model.Projet;
import com.pfe.model.TacheProjet;
import com.pfe.model.Utilisateurs;

public interface TacheService {

	List<TacheProjet> listProjets();
 	TacheProjet findById(Long id);
	 List<TacheProjet> findByProjet(Projet projet);
	TacheProjet ajouterTacheProjet(TacheProjet tacheProjet, Long idprojet);
	 List<TacheProjet> findByEmployeur(Utilisateurs employeur);
	 TacheProjet fini(Long id);
	TacheProjet updateTache(Long id, MultipartFile file, String nomTache, String description, Long employeurId,
			Boolean etat) throws IOException;
	void deleteTache(Long id);
}
