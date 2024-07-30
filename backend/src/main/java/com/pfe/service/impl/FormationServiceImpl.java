package com.pfe.service.impl;

 import com.pfe.model.Departement;
import com.pfe.model.Formation;
import com.pfe.model.Utilisateurs;
import com.pfe.repository.DepartementRepo;
import com.pfe.repository.FormationRepo;
 import com.pfe.repository.UtilisateursRepo;
 import com.pfe.service.FormationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Service
public class FormationServiceImpl implements FormationService {

    @Autowired
    private FormationRepo formationRepository;

    @Autowired
    private UtilisateursRepo utilisateursRepository;

    @Autowired
    private DepartementRepo departementRepo;

    @Override
    public Formation ajouterFormation(Formation formation, Long idDep) {
        Departement departement = departementRepo.findById(idDep).get();
        formation.setDateCreation(new Date());
        formation.setDepartement(departement);
        return formationRepository.save(formation);
    }

    @Override
    public List<Formation> listFormation() {
        return formationRepository.findAll();
    }

    @Override
    public List<Formation> findByDepartement(Departement departement) {
        return formationRepository.findByDepartement(departement);
    }

    @Override
    public Formation findById(Long id) {
        return formationRepository.findById(id).get();
    }

    @Override
    public Formation ajoutrFormateur(Formation formation) {
        return formationRepository.save(formation);
    }

    @Override
    public Formation ajouterMembres(Long formationId, Long memberId) {
        Formation formation = formationRepository.findById(formationId)
                .orElseThrow(() -> new RuntimeException("Formation not found"));
        Utilisateurs member = utilisateursRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<Utilisateurs> members = formation.getMembers();
        if (members == null) {
            members = new HashSet<>();
        }
        members.add(member);
        formation.setMembers(members);

        return formationRepository.save(formation);
    }

}
