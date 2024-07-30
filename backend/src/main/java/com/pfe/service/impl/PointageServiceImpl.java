package com.pfe.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pfe.model.Pointage;
import com.pfe.model.Utilisateurs;
import com.pfe.repository.PointageRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.PointageService;

import java.util.Date;
import java.util.List;

@Service
public class PointageServiceImpl implements PointageService {

    @Autowired
    private PointageRepo pointageRepo;
    @Autowired
    private UtilisateursRepo utilisateursRepo;

    @Override
    public Pointage marquerPresence(Pointage pointage, Long utilisateurId) {
        Utilisateurs utilisateurs = utilisateursRepo.findById(utilisateurId).get();
        pointage.setEmployeur(utilisateurs);
        pointage.setDateJours(new Date());
        return pointageRepo.save(pointage);
    }

    @Override
    public List<Pointage> findByEmployeur(Utilisateurs employeur) {
        return pointageRepo.findByEmployeur(employeur);
    }

    @Override
    public List<Pointage> findAll() {
        return pointageRepo.findAll();
    }

    @Override
    public List<Pointage> findByDepartment(Long department) {
        return pointageRepo.findByEmployeurDepartementId(department);
    }
}
