package com.pfe.service.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pfe.model.Projet;
import com.pfe.model.TacheProjet;
import com.pfe.model.Utilisateurs;
import com.pfe.repository.EmployeeRepo;
import com.pfe.repository.ProjetRepo;
import com.pfe.repository.TacheProjetRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.TacheService;

@Service
public class TacheProjetServiceImpl implements TacheService {
	@Autowired
	private TacheProjetRepo tacheProjetRepo;
	@Autowired
	private ProjetRepo projetRepo;
	@Autowired
	private UtilisateursRepo utilisateursRepo;

	@Override
	public List<TacheProjet> listProjets() {
		return tacheProjetRepo.findAll();
	}

	@Override
	public TacheProjet ajouterTacheProjet(TacheProjet tacheProjet, Long idprojet) {
		Projet projet = projetRepo.findById(idprojet).get();
		tacheProjet.setDescription(tacheProjet.getDescription());
		tacheProjet.setNomTache(tacheProjet.getNomTache());
		tacheProjet.setProjet(projet);
		tacheProjet.setDoc(tacheProjet.getDoc());
		tacheProjet.setNomDoc(tacheProjet.getNomDoc());
		return tacheProjetRepo.save(tacheProjet);
	}

	@Override
	public TacheProjet findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TacheProjet> findByProjet(Projet projet) {
		// TODO Auto-generated method stub
		return tacheProjetRepo.findByProjet(projet);
	}

	@Override
	public List<TacheProjet> findByEmployeur(Utilisateurs employeur) {
		// TODO Auto-generated method stub
		return tacheProjetRepo.findByEmployeur(employeur);
	}

	@Override
	public TacheProjet fini(Long id) {
		TacheProjet tacheProjet = tacheProjetRepo.findById(id).get();
		if (!tacheProjet.isEtat()) {
			tacheProjet.setEtat(true);
			return tacheProjetRepo.save(tacheProjet);
		} else {
 			  return null;

		}
	}
	@Override
	 public TacheProjet updateTache(Long id, MultipartFile file, String nomTache, String description, Long employeurId, Boolean etat) throws IOException {
	        TacheProjet tache = tacheProjetRepo.findById(id).orElseThrow();
	        tache.setNomTache(nomTache);
	        tache.setDescription(description);
	        tache.setEmployeur(utilisateursRepo.findById(employeurId).get());
	        tache.setEtat(etat);
	        if (file != null && !file.isEmpty()) {
	            tache.setDoc(file.getBytes());
	            tache.setNomDoc(file.getOriginalFilename());
	        }
	        return tacheProjetRepo.save(tache);
	    }
	@Override
	 public void deleteTache(Long id) {
	        tacheProjetRepo.deleteById(id);
	    }
}
