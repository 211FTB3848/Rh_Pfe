package com.pfe.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.pfe.model.Conge;
import com.pfe.model.Utilisateurs;
import com.pfe.service.CongeService;
import com.pfe.service.UtilisateurService;

@RestController
@RequestMapping(value = "/api/conge")
public class CongeController {
    @Autowired
    private CongeService congeService;
@Autowired
private UtilisateurService utilisateurService;
    @PostMapping("/demande")
    public Conge demandeConge(@RequestBody Conge conge, @RequestParam Long idEmp) {
        return congeService.demandeConge(conge, idEmp);
    }

    @GetMapping("/list")
    public List<Conge> listConges() {
        return congeService.listConges();
    }

    @GetMapping("/byEmployeur/{id}")
    public List<Conge> findByEmployeur(@PathVariable Long id) {
    	Utilisateurs employeur=utilisateurService.findByIdUtilisateurs(id);
        return congeService.findByEmployeur(employeur);
    }

    @GetMapping("/byDepartement")
    public List<Conge> findByDepartement(@RequestParam Long departementId) {
        return congeService.findByDepartement(departementId);
    }

    @GetMapping("/allForAdmin")
    public List<Conge> findAllForAdmin() {
        return congeService.findAllForAdmin();
    }
    @PutMapping("/accept/{id}")
    public Conge acceptConge(@PathVariable Long id) {
        return congeService.acceptConge(id);
    }

    @PutMapping("/refuse/{id}")
    public Conge refuseConge(@PathVariable Long id) {
        return congeService.refuseConge(id);
    }
}
