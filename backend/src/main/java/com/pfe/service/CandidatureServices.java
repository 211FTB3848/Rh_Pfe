package com.pfe.service;
import java.util.List;

import com.pfe.model.Candidat;
import com.pfe.model.Candidature;
import com.pfe.model.Departement;

public interface CandidatureServices {
     List<Candidature> findByCandidat(Candidat candidat);
    Candidature findById(Long id);
    void deleteById(Long id);
    Candidature acceptCandidature(Long id);
    Candidature rejectCandidature(Long id);
 	Candidature saveCandidature(Candidature candidature, Long idCan, Long idOffer);
    List<Candidature> findByOfferEmploi_Departement(Departement departement);
    List<Candidature> all();
 
}
