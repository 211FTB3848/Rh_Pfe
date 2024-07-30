package com.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.Candidat;
import com.pfe.model.Candidature;
import com.pfe.model.Departement;
import com.pfe.model.OfferEmploi;

import java.util.List;

public interface CandidatureRepo extends JpaRepository<Candidature, Long> {
    List<Candidature> findByCandidat(Candidat candidat);    
    List<Candidature> findByOfferEmploi_Departement(Departement departement);
	List<Candidature> findByOfferEmploi(OfferEmploi offerEmploi);

}
