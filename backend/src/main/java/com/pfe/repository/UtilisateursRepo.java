package com.pfe.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pfe.model.Departement;
import com.pfe.model.Employee;
import com.pfe.model.RolesUtilisateur;
import com.pfe.model.Utilisateurs;

public interface UtilisateursRepo extends JpaRepository<Utilisateurs, Long> {
	boolean existsByCin(String cin);
	boolean existsByEmail(String email);
	boolean existsByRolesUtilisateurContains(Set<RolesUtilisateur> singleton);
	Utilisateurs findByEmail(String email);


	@Query("SELECT u FROM Utilisateurs u JOIN u.rolesUtilisateur r WHERE r.nomRoles = :roleName")
	List<Utilisateurs> findByRoleName(@Param("roleName") String roleName);

 
 @Query("SELECT u FROM Utilisateurs u JOIN u.rolesUtilisateur r WHERE r.nomRoles = :roleName AND u.departement.id = :departmentId")
 	List<Utilisateurs> findUtilisateursByRoleAndDepartment(@Param("roleName") String roleName,
 			@Param("departmentId") Long departmentId);
List<Utilisateurs> findByDepartement(Departement departement); 
 
}
