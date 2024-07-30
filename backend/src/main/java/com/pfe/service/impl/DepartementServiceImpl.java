package com.pfe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.model.Candidature;
import com.pfe.model.Conge;
import com.pfe.model.Departement;
import com.pfe.model.Formation;
import com.pfe.model.OfferEmploi;
import com.pfe.model.PasswordResetToken;
import com.pfe.model.Pointage;
import com.pfe.model.Projet;
import com.pfe.model.TacheProjet;
import com.pfe.model.Utilisateurs;
import com.pfe.repository.CandidatureRepo;
import com.pfe.repository.CongeRepo;
import com.pfe.repository.DepartementRepo;
import com.pfe.repository.FormationRepo;
import com.pfe.repository.OfferEmploiRepo;
import com.pfe.repository.PasswordResetTokenRepository;
import com.pfe.repository.PointageRepo;
import com.pfe.repository.ProjetRepo;
import com.pfe.repository.TacheProjetRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.DepartementService;
import com.pfe.validation.DepartementVidation;

import jakarta.transaction.Transactional;

@Service
public class DepartementServiceImpl implements DepartementService {

	@Autowired
	private DepartementRepo departementRepo;
	@Autowired
	private UtilisateursRepo utilisateursRepo;
	@Autowired
	private CandidatureRepo candidatureRepo;

	@Autowired
	private FormationRepo formationRepo;

	@Autowired
	private ProjetRepo projetRepo;
	@Autowired
	private TacheProjetRepo tacheProjetRepo;
	@Autowired
	private CongeRepo congeRepo;
	@Autowired
	private PointageRepo pointageRepo;
	@Autowired
	private PasswordResetTokenRepository passwordResetTokenRepository;
	@Autowired
	private OfferEmploiRepo offerEmploiRepo;

	@Override
	public List<Departement> listDepartements() {
		return departementRepo.findAll();
	}

	@Override
	public Departement saveOrUpdateDepartement(Departement departement) {
		List<String> listErreur = DepartementVidation.VALIDATIPN(departement);
		if (!listErreur.isEmpty()) {
			return null;
		}

		Departement existingDepartement = departementRepo.findByNomDep(departement.getNomDep());
		if (existingDepartement != null) {
			if (!existingDepartement.getId().equals(departement.getId())) {
				// If there's a department with the same name but different ID, return null or
				// throw an exception
				return null;
			} else {
				// Update the existing department
				existingDepartement.setDescription(departement.getDescription());
				return departementRepo.save(existingDepartement);
			}
		} else {
			// Create a new department
			return departementRepo.save(departement);
		}
	}

	@Override
	public Departement findByIdDepartement(Long id) {
		// TODO Auto-generated method stub
		return departementRepo.findById(id).orElse(null);
	}
	@Transactional
	@Override
	public void deletDepartement(Long id) {
	    Departement departement = departementRepo.findById(id).orElse(null);
	    if (departement != null) {
	        // Delete related OfferEmploi entities
	        List<OfferEmploi> offerEmplois = offerEmploiRepo.findByDepartement(departement);

	        // Delete related Candidature entities for each OfferEmploi
	        for (OfferEmploi offerEmploi : offerEmplois) {
	            List<Candidature> candidatures = candidatureRepo.findByOfferEmploi(offerEmploi);
	            candidatureRepo.deleteAll(candidatures);
	        }

	        offerEmploiRepo.deleteAll(offerEmplois);

	        // Delete related PasswordResetToken entities
	        List<PasswordResetToken> passwordResetTokens = passwordResetTokenRepository.findByUtilisateur_Departement(departement);
	        passwordResetTokenRepository.deleteAll(passwordResetTokens);

	        // Delete related Conge entities
	        List<Conge> conges = congeRepo.findByEmployeur_Departement(departement);
	        congeRepo.deleteAll(conges);

	        // Delete related TacheProjet entities
	        List<TacheProjet> taches = tacheProjetRepo.findByEmployeur_Departement(departement);
	        tacheProjetRepo.deleteAll(taches);

	        // Delete related Pointage entities
	        List<Pointage> pointages = pointageRepo.findByEmployeur_Departement(departement);
	        pointageRepo.deleteAll(pointages);

	        // Delete related Formation entities
	        List<Formation> formations = formationRepo.findByDepartement(departement);

	        
	        formationRepo.deleteAll(formations);

	        // Delete related Utilisateurs entities
	        List<Utilisateurs> utilisateurs = utilisateursRepo.findByDepartement(departement);

	        
	        
	        utilisateursRepo.deleteAll(utilisateurs);

	        // Delete related Projet entities
	        List<Projet> projets = projetRepo.findByDepartement(departement);
	        projetRepo.deleteAll(projets);

	        // Finally, delete the department
	        departementRepo.deleteById(id);
	    } else {
	        throw new RuntimeException("Departement with id " + id + " does not exist");
	    }
	}

}