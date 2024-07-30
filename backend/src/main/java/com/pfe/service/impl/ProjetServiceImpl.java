package com.pfe.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.model.Departement;
import com.pfe.model.Projet;
import com.pfe.model.TacheProjet;
import com.pfe.model.Utilisateurs;
import com.pfe.repository.ProjetRepo;
import com.pfe.repository.TacheProjetRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.ProjetService;

@Service
public class ProjetServiceImpl implements ProjetService {
    @Autowired
    private ProjetRepo projetRepo;
    @Autowired
    private UtilisateursRepo utilisateursRepo;
@Autowired
private TacheProjetRepo tacheProjetRepo;
    @Override
    public List<Projet> listProjets() {
        return projetRepo.findAll();
    }

    @Override
    public List<Projet> findByResponsable(Utilisateurs responsable) {
        // TODO: Implement this method if necessary
        return null;
    }

    @Override
    public Projet creeProjet(Projet projet) {
        boolean exist = projetRepo.existsByChefProjetAndDatedebut(projet.getChefProjet(),projet.getDatedebut() );
        if (!exist) {
            projet.setChefProjet(projet.getChefProjet());
            projet.setDateCreation(new Date());
            projet.setTitre(projet.getTitre());
            projet.setDescription(projet.getDescription());
            projet.setDatedebut(projet.getDatedebut());
            projet.setDatefin(projet.getDatefin());
            projet.setDepartement(projet.getChefProjet().getDepartement());
            return projetRepo.save(projet);
        } else {
            return null;
        }
    }

    @Override
    public Projet modifierProjet(Projet projet) {
        if (projetRepo.existsById(projet.getId())) {
            projet.setDateModification(new Date());
            return projetRepo.save(projet);
        } else {
            return null;
        }
    }

    @Override
    public void supprimerProjet(Long id) {
        if (projetRepo.existsById(id)) {
        	Projet projet= projetRepo.findById(id).get();
        	List<TacheProjet> tacheProjets=tacheProjetRepo.findByProjet(projet);
        	for(TacheProjet tacheProjet : tacheProjets) {
        		tacheProjetRepo.delete(tacheProjet);
        	}
            projetRepo.delete(projet);
        }
    }

    @Override
    public Projet findById(Long id) {
        return projetRepo.findById(id).orElse(null);
    }

    @Override
    public List<Projet> findByChefProjet(Utilisateurs chefProjet) {
        return projetRepo.findByChefProjet(chefProjet);
    }

    @Override
    public List<Projet> findByDep(Departement departement) {
        return projetRepo.findByDepartement(departement);
    }
}
