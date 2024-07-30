package com.pfe.controller;

import com.pfe.model.Pointage;
import com.pfe.model.Utilisateurs;
import com.pfe.service.PointageService;
import com.pfe.service.UtilisateurService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/pointage")
public class PointageController {

    @Autowired
    private PointageService pointageService;
    @Autowired
    private UtilisateurService utilisateurService;
    @PostMapping("/marquer")
    public void marquerPresence(@RequestBody Pointage pointage , @RequestParam Long idUtilisateur) {
        pointageService.marquerPresence(pointage, idUtilisateur);
    }

    @GetMapping("/get")
    public List<Pointage> getPointage(@RequestParam Long utilisateurId) {
    	Utilisateurs utilisateurs=utilisateurService.findByIdUtilisateurs(utilisateurId);
        return pointageService.findByEmployeur(utilisateurs);
    }
    @GetMapping("/getAll")
    public List<Pointage> getAlPointage() {
         return pointageService.findAll();
    }
}
