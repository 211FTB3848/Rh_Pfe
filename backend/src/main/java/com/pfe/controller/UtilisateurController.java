package com.pfe.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.model.Candidat;
import com.pfe.model.ChefAppartement;
import com.pfe.model.ChefProjet;
 import com.pfe.model.Departement;
import com.pfe.model.Employee;
 import com.pfe.model.Utilisateurs;
import com.pfe.service.DepartementService;
import com.pfe.service.UtilisateurService;

@RestController
@RequestMapping(value = "/api/utilisateur")
public class UtilisateurController {
@Autowired
private UtilisateurService utilisateurService;
@Autowired
private DepartementService departementService;
@GetMapping(value = "/listChefDep")
public List<Utilisateurs> listUtilisateur(){
	return utilisateurService.findByRole("CHEF DAPRATEMENT");
}

@PostMapping(value = "/save/jobseeker")
public Candidat addJobSeeker(@RequestBody Candidat demandeurEmploi) {
	System.out.println(demandeurEmploi);
	return utilisateurService.addDemandeurEmploi(demandeurEmploi);
}
@GetMapping(value = "/listChefProjet")
public List<Utilisateurs> listEmployeur(){
	return utilisateurService.findByRole("CHEF PROJET");
}
 
 
@GetMapping(value = "/listCondidat")
public List<Utilisateurs> listCondidat(){
	return utilisateurService.findByRole("CONDIDAT");
}
@GetMapping(value = "/listEMPLOYEE")
public List<Utilisateurs> listEMPLOYEE(){
	return utilisateurService.findByRole("EMPLOYEE");
}

@PostMapping(value = "/saveChefDep")
public ChefAppartement saveChefDep(@RequestBody ChefAppartement chefAppartement) {
	return utilisateurService.ajouterChef(chefAppartement);
}
 
@PostMapping(value = "/saveAdmin")
public Utilisateurs saveAdmin(@RequestBody Utilisateurs utilisateurs) {
	return utilisateurService.inscriptionAdmin(utilisateurs);
}
@PostMapping(value = "/saveEmployeur")
public Employee saveEmployeur(@RequestPart("emp") Employee employee ,@RequestParam Long id) {
	System.out.println(id);
	return utilisateurService.ajouterEmployeur(employee, id);
}
@PostMapping(value = "/saveChefProjet")
public ChefProjet saveChefProjet(@RequestPart("chefprj") ChefProjet chefProjet ,@RequestParam Long id) {
	System.out.println(id);
	return utilisateurService.ajouterChefProjet(chefProjet, id);
}
@GetMapping(value = "/byId/{id}")
public Utilisateurs findById(@PathVariable Long id) {
	return utilisateurService.findByIdUtilisateurs(id);
}
@GetMapping(value = "/byDepChefAppartement/{id}")
public List<ChefAppartement> byDepChefAppartement(@PathVariable Long id) {
	Departement departement=departementService.findByIdDepartement(id);
	System.out.println(departementService.findByIdDepartement(id));
	return utilisateurService.findByDepartementChefAppartement(departement);
}
@GetMapping(value = "/byDepEmployee/{id}")
public List<Employee> byDepEmployee(@PathVariable Long id) {
	Departement departement=departementService.findByIdDepartement(id);
	System.out.println(departementService.findByIdDepartement(id));
	return utilisateurService.findByDepartementEmployee(departement);
}
@GetMapping(value = "/byDepChefProjet/{id}")
public List<ChefProjet> byDepChefProjet(@PathVariable Long id) {
	Departement departement=departementService.findByIdDepartement(id);
	System.out.println(departementService.findByIdDepartement(id));
	return utilisateurService.findByDepartementChefProjet(departement);
}
@GetMapping(value = "/bymail/{email}")
public Utilisateurs findByEmail(@PathVariable String email) {
	return utilisateurService.findByEmail(email);
}
@GetMapping(value = "/active/{id}")
public Utilisateurs active(@PathVariable Long id) {
	return utilisateurService.activeDesactiveUtilisateur(id);
}
@PutMapping(value = "/updatechefAppartement/{id}")
public Utilisateurs updatechefAppartement(@PathVariable Long id, @RequestBody ChefAppartement chefAppartement) {
    return utilisateurService.modifierChefAppartement(id, chefAppartement);
}
@PutMapping(value = "/updateEmployee/{id}")
public Utilisateurs updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
    return utilisateurService.modifierEmployee(id, employee);
}
@PutMapping(value = "/updateChefProjet/{id}")
public Utilisateurs updateChefProjet(@PathVariable Long id, @RequestBody ChefProjet chefProjet) {
    return utilisateurService.modifierChefProjet(id, chefProjet);
}
 
}
