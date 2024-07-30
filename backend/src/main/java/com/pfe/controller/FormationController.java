package com.pfe.controller;

 import com.pfe.model.Departement;
import com.pfe.model.Formation;
import com.pfe.model.Utilisateurs;
import com.pfe.service.DepartementService;
import com.pfe.service.FormationService;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/formations")
public class FormationController {

    @Autowired
    private FormationService formationService;

    @Autowired
    private DepartementService departementService;

    @PostMapping(value = "/ajouter")
    public Formation ajouterFormation(@RequestBody Formation formation, @RequestParam Long idDep) {
        return formationService.ajouterFormation(formation, idDep);
    }

    @GetMapping(value = "/list")
    public List<Formation> getListFormation() {
        return formationService.listFormation();
    }

    @GetMapping(value = "/byDep/{id}")
    public List<Formation> listFormationByDep(@PathVariable Long id) {
        Departement departement = departementService.findByIdDepartement(id);
        return formationService.findByDepartement(departement);
    }

    @GetMapping(value = "/byId/{id}")
    public Formation formationById(@PathVariable Long id) {
        return formationService.findById(id);
    }

    @PutMapping(value = "/ajouterFormateur")
    public Formation ajouterFormateur(@RequestBody Formation formation) {
        return formationService.ajoutrFormateur(formation);
    }

    @PutMapping(value = "/ajouterMembres")
    public Formation ajouterMembres(@RequestParam Long formationId, @RequestBody Long memberId) {
        return formationService.ajouterMembres(formationId, memberId);
    }
}
