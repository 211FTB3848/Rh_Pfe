package com.pfe.service;

import java.util.List;

import com.pfe.model.Departement;
import com.pfe.model.OfferEmploi;

public interface OfferEmploiServices {

	OfferEmploi findByIdOfferEmploi(Long id);

	void deleteOfferEmploi(Long id);

	List<OfferEmploi> findByDepartement(Departement departement);

	List<OfferEmploi> offerEmplois();

	OfferEmploi addNewOfferEmploi(OfferEmploi offerEmploi, Long idDep);

	OfferEmploi updateOfferEmploi(Long id, OfferEmploi offerEmploi);

}
