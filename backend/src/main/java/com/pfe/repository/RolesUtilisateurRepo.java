package com.pfe.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.RolesUtilisateur;

 
public interface RolesUtilisateurRepo extends JpaRepository<RolesUtilisateur, Long> {
 
	RolesUtilisateur findByNomRoles(String nomRoles); 

 
}
