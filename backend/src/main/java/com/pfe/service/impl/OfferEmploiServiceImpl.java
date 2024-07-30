package com.pfe.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.model.Departement;
import com.pfe.model.OfferEmploi;
import com.pfe.repository.DepartementRepo;
import com.pfe.repository.OfferEmploiRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.OfferEmploiServices;

@Service

public class OfferEmploiServiceImpl implements OfferEmploiServices {

	@Autowired
	private OfferEmploiRepo offerEmploiRepo;
	@Autowired
	private DepartementRepo departementRepo;
	@Autowired
	private UtilisateursRepo utilisateursRepo;

	@Override
	public OfferEmploi addNewOfferEmploi(OfferEmploi offerEmploi, Long idDep) {
		Departement departement = departementRepo.findById(idDep).get();

		offerEmploi.setDepartement(departement);
		offerEmploi.setTitre(offerEmploi.getTitre());
		offerEmploi.setDateCreation(new Date());
		offerEmploi.setDateExpiraton(offerEmploi.getDateExpiraton());
		offerEmploi.setResumePoste(offerEmploi.getResumePoste());
		offerEmploi.setSalMax(offerEmploi.getSalMax());
		offerEmploi.setSalMin(offerEmploi.getSalMin());
		offerEmploi.setLocation(offerEmploi.getLocation());
		offerEmploi.setTypeOfferEmploi(offerEmploi.getTypeOfferEmploi());
		return offerEmploiRepo.save(offerEmploi);
	}

	@Override
	public List<OfferEmploi> offerEmplois() {
		// TODO Auto-generated method stub
		return offerEmploiRepo.findAll();
	}

	@Override
	public OfferEmploi findByIdOfferEmploi(Long id) {
		// TODO Auto-generated method stub
		return offerEmploiRepo.findById(id).get();
	}

	@Override
	public OfferEmploi updateOfferEmploi(Long id, OfferEmploi offerEmploi) {
		OfferEmploi existingOffer = offerEmploiRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Offer not found"));

		// Update fields as needed
		existingOffer.setTitre(offerEmploi.getTitre());
		existingOffer.setResumePoste(offerEmploi.getResumePoste());
		existingOffer.setSalMax(offerEmploi.getSalMax());
		existingOffer.setSalMin(offerEmploi.getSalMin());
		existingOffer.setLocation(offerEmploi.getLocation());
		existingOffer.setDateExpiraton(offerEmploi.getDateExpiraton());
		existingOffer.setTypeOfferEmploi(offerEmploi.getTypeOfferEmploi());

		return offerEmploiRepo.save(existingOffer);
	}

	@Override
	public void deleteOfferEmploi(Long id) {
		// TODO Auto-generated method stub
		offerEmploiRepo.deleteById(id);
	}

	@Override
	public List<OfferEmploi> findByDepartement(Departement departement) {
		// TODO Auto-generated method stub
		return offerEmploiRepo.findByDepartement(departement);
	}

}
