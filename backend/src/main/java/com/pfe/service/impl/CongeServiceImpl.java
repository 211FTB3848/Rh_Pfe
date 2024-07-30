package com.pfe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.model.Conge;
import com.pfe.model.Utilisateurs;
import com.pfe.repository.CongeRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.CongeService;

@Service
public class CongeServiceImpl implements CongeService {

    @Autowired
    private CongeRepo congeRepo;
    @Autowired
    private UtilisateursRepo utilisateursRepo;
    @Override
    public Conge demandeConge(Conge conge, Long idEmp) {
         conge.setPinding(true);
        conge.setEtat(false);

         Utilisateurs employeur = utilisateursRepo.findById(idEmp)
            .orElseThrow(() -> new RuntimeException("Employeur not found"));
        conge.setEmployeur(employeur);

         return congeRepo.save(conge);
    }


    @Override
    public List<Conge> listConges() {
        return congeRepo.findAll();
    }

    @Override
    public List<Conge> findByEmployeur(Utilisateurs employeur) {
        return congeRepo.findByEmployeur(employeur);
    }

    @Override
    public List<Conge> findByDepartement(Long departementId) {
        return congeRepo.findByEmployeur_Departement_Id(departementId);
    }

    @Override
    public List<Conge> findAllForAdmin() {
        return congeRepo.findAll();
    }
    @Override
    public Conge acceptConge(Long id) {
        Conge conge = congeRepo.findById(id).orElseThrow(() -> new RuntimeException("Conge not found"));
        conge.setEtat(true);
        conge.setPinding(false);
        return congeRepo.save(conge);
    }

    @Override
    public Conge refuseConge(Long id) {
        Conge conge = congeRepo.findById(id).orElseThrow(() -> new RuntimeException("Conge not found"));
        conge.setEtat(false);
        conge.setPinding(false);
        return congeRepo.save(conge);
    }

}
