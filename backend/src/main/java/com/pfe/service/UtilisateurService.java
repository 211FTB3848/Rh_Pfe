package com.pfe.service;

import java.util.List;
import java.util.Set;

import com.pfe.model.Candidat;
import com.pfe.model.ChefAppartement;
import com.pfe.model.ChefProjet;
import com.pfe.model.Departement;
import com.pfe.model.Employee;
import com.pfe.model.RolesUtilisateur;
import com.pfe.model.Utilisateurs;

public interface UtilisateurService {
    Utilisateurs findByIdUtilisateurs(Long id);
    List<Utilisateurs> listUtilisateur();
    Utilisateurs activeDesactiveUtilisateur(Long id);
    Utilisateurs inscriptionAdmin(Utilisateurs utilisateurs);
     Utilisateurs findByEmail(String email);
    List<Utilisateurs> findByRole(String roleName);
    List<ChefAppartement> findByDepartementChefAppartement(Departement departement);
    List<Employee> findByDepartementEmployee(Departement departement);
    List<ChefProjet> findByDepartementChefProjet(Departement departement);
    List<Utilisateurs> getUtilisateursByRoleAndDepartment(String roleName, Long departmentId);
 	ChefAppartement ajouterChef(ChefAppartement chefAppartement);
	ChefProjet ajouterChefProjet(ChefProjet chefProjet , Long idDep);
	Employee ajouterEmployeur(Employee employee, Long idDep);
 	Utilisateurs modifierChefAppartement(Long id, ChefAppartement chefAppartement);
	Utilisateurs modifierEmployee(Long id, Employee employee);
	Utilisateurs modifierChefProjet(Long id, ChefProjet chefProjet);
	Candidat addDemandeurEmploi(Candidat candidat);
}
