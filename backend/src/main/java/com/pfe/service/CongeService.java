package com.pfe.service;

import java.util.List;

import com.pfe.model.Conge;
import com.pfe.model.Utilisateurs;

public interface CongeService {
    Conge demandeConge(Conge conge, Long idEmp);
    List<Conge> listConges();
    List<Conge> findByEmployeur(Utilisateurs employeur);
    List<Conge> findByDepartement(Long departementId);
    List<Conge> findAllForAdmin();
    Conge acceptConge(Long id);
    Conge refuseConge(Long id);
}
