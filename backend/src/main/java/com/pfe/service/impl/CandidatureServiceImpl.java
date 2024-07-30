package com.pfe.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.model.Candidat;
import com.pfe.model.Candidature;
import com.pfe.model.Departement;
import com.pfe.model.OfferEmploi;
import com.pfe.repository.CandidatureRepo;
import com.pfe.repository.OfferEmploiRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.CandidatureServices;

import java.util.Date;
import java.util.List;

@Service
public class CandidatureServiceImpl implements CandidatureServices {

    @Autowired
    private CandidatureRepo candidatureRepo;
    @Autowired
    private UtilisateursRepo utilisateursRepo;
    @Autowired
    private OfferEmploiRepo offerEmploiRepo;
    @Override
    public Candidature saveCandidature(Candidature candidature , Long idCan , Long idOffer) {
    	Candidat candidat=(Candidat) utilisateursRepo.findById(idCan).get();
    	OfferEmploi offerEmploi=offerEmploiRepo.findById(idOffer).get();
    	if (candidature.getDateCandidture() == null) {
            candidature.setDateCandidture(new Date());
        }
        candidature.setAcepted(false);
        candidature.setPinding(true);
        candidature.setPinding(false);
    	candidature.setCandidat(candidat);
    	candidature.setOfferEmploi(offerEmploi);
        return candidatureRepo.save(candidature);
    }

    @Override
    public List<Candidature> findByCandidat(Candidat candidat) {
        return candidatureRepo.findByCandidat(candidat);
    }

    @Override
    public Candidature findById(Long id) {
        return candidatureRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        candidatureRepo.deleteById(id);
    }

    @Override
    public Candidature acceptCandidature(Long id) {
        Candidature candidature = findById(id);
        if (candidature != null && !candidature.isRefused() && candidature.isPinding()) {
            candidature.setAcepted(true);
            candidature.setPinding(false);
            return candidatureRepo.save(candidature);
        }
        return null;
    }

    @Override
    public Candidature rejectCandidature(Long id) {
        Candidature candidature = findById(id);
        if (candidature != null && !candidature.isAcepted() && candidature.isPinding()) {
            candidature.setRefused(true);
            candidature.setPinding(false);
            return candidatureRepo.save(candidature);
        }
        return null;
    }

	@Override
	public List<Candidature> findByOfferEmploi_Departement(Departement departement) {
		// TODO Auto-generated method stub
		return candidatureRepo.findByOfferEmploi_Departement(departement);
	}

	@Override
	public List<Candidature> all() {
		// TODO Auto-generated method stub
		return candidatureRepo.findAll();
	}
}
