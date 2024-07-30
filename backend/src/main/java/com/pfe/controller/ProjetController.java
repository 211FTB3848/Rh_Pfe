package com.pfe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pfe.model.Departement;
import com.pfe.model.Projet;
import com.pfe.model.Utilisateurs;
import com.pfe.service.DepartementService;
import com.pfe.service.ProjetService;
import com.pfe.service.UtilisateurService;

@RestController
@RequestMapping(value = "/api/projet")
public class ProjetController {
    @Autowired
    private ProjetService projetService;
    @Autowired
    private DepartementService departementService;
    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping(value = "/allProjet")
    public List<Projet> listProjet() {
        return projetService.listProjets();
    }

    @GetMapping(value = "/byDep/{id}")
    public List<Projet> byDep(@PathVariable Long id) {
        Departement departement = departementService.findByIdDepartement(id);
        return projetService.findByDep(departement);
    }

    @GetMapping(value = "/bychefProjet/{id}")
    public List<Projet> bychefProjet(@PathVariable Long id) {
        Utilisateurs chefProjet = utilisateurService.findByIdUtilisateurs(id);
        return projetService.findByChefProjet(chefProjet);
    }

    @PostMapping(value = "/saveProjet")
    public Projet saveNewProjet(@RequestBody Projet projet) {
        return projetService.creeProjet(projet);
    }

    @PutMapping(value = "/updateProjet")
    public Projet updateProjet(@RequestBody Projet projet) {
        return projetService.modifierProjet(projet);
    }

    @DeleteMapping(value = "/deleteProjet/{id}")
    public void deleteProjet(@PathVariable Long id) {
        projetService.supprimerProjet(id);
    }

    @GetMapping(value = "/allProjetResponsable/{id}")
    public List<Projet> listProjetResponsable(@PathVariable Long id) {
        Utilisateurs responsable = utilisateurService.findByIdUtilisateurs(id);
        return projetService.findByResponsable(responsable);
    }

    @GetMapping(value = "/projetByid/{id}")
    public Projet projetByid(@PathVariable Long id) {
        return projetService.findById(id);
    }
}
