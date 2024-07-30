package com.pfe.service;

import com.pfe.model.Pointage;
import com.pfe.model.Utilisateurs;
import java.util.List;

public interface PointageService {
    Pointage marquerPresence(Pointage pointage, Long utilisateurId);
    List<Pointage> findByEmployeur(Utilisateurs employeur);
    List<Pointage> findAll();
    List<Pointage> findByDepartment(Long department);
}
