package com.pfe.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pfe.model.Projet;
import com.pfe.model.TacheProjet;
import com.pfe.model.Utilisateurs;
import com.pfe.service.ProjetService;
import com.pfe.service.TacheService;
import com.pfe.service.UtilisateurService;

@RestController
@RequestMapping(value = "/api/tache")
public class TacheProjetController {
@Autowired
private TacheService tacheService;
@Autowired
private ProjetService projetService;
@Autowired
private UtilisateurService  service;
@GetMapping(value = "/tacheByProjet/{id}")
public List<TacheProjet> listTacheProjetsByProjet(@PathVariable Long id){
	Projet projet = projetService.findById(id);
	return tacheService.findByProjet(projet);
}
@PostMapping(value = "/saveTache")
public TacheProjet saveTache(@RequestPart("tache") TacheProjet tacheProjet ,
							@RequestParam Long idProjet ,
							@RequestPart("doc") MultipartFile doc){
	try {
		tacheProjet.setDoc(doc.getBytes());
		tacheProjet.setNomDoc(doc.getOriginalFilename());
		return tacheService.ajouterTacheProjet(tacheProjet, idProjet);

	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		return null ;
	}
}
@GetMapping(value = "/tacheByEmp/{id}")
public List<TacheProjet> findByEmployer(@PathVariable Long id){
	Utilisateurs emp= service.findByIdUtilisateurs(id);
	return tacheService.findByEmployeur(emp);
}
@GetMapping(value = "/fini/{id}")
public TacheProjet fini(@PathVariable Long id){
 	return tacheService.fini(id);
}
@PutMapping("/update/{id}")
public TacheProjet updateTache(@PathVariable Long id,
                               @RequestPart(value = "doc" ,  required = false) MultipartFile file,
                               @RequestParam("nomTache") String nomTache,
                               @RequestParam("description") String description,
                               @RequestParam("employeur.id") Long employeurId,
                               @RequestParam("etat") Boolean etat) throws IOException {
    return tacheService.updateTache(id, file, nomTache, description, employeurId, etat);
}
@DeleteMapping("/delete/{id}")
public void deleteTache(@PathVariable Long id) {
    tacheService.deleteTache(id);
}
}
