package com.pfe.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pfe.model.Candidat;
import com.pfe.model.ChefAppartement;
import com.pfe.model.ChefProjet;
import com.pfe.model.Departement;
import com.pfe.model.Employee;
import com.pfe.model.RolesUtilisateur;
import com.pfe.model.Utilisateurs;
import com.pfe.repository.ChefAppartementRepo;
import com.pfe.repository.ChefProjetRepo;
import com.pfe.repository.DepartementRepo;
import com.pfe.repository.EmployeeRepo;
import com.pfe.repository.RolesUtilisateurRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.EmailService;
import com.pfe.service.UtilisateurService;
import com.pfe.validation.UtilisateurValidation;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

	@Autowired
	private UtilisateursRepo utilisateursRepo;
	@Autowired
	private ChefAppartementRepo chefAppartementRepo;
	@Autowired
	private EmployeeRepo employeeRepo;
	@Autowired
	private ChefProjetRepo chefProjetRepo;
	@Autowired
	private RolesUtilisateurRepo rolesUtilisateurRepo;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private DepartementRepo departementRepo;

	@Autowired
	private UtilisateurValidation utilisateurValidation;

	 @Autowired
	    private EmailService emailService;

	@Override
	public Utilisateurs modifierChefAppartement(Long id, ChefAppartement chefAppartement) {
		utilisateurValidation.validateModification(chefAppartement); // Validation
		ChefAppartement existingUtilisateur = (ChefAppartement) utilisateursRepo.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("User not found"));

		existingUtilisateur.setNom(chefAppartement.getNom());
		existingUtilisateur.setPrenom(chefAppartement.getPrenom());
		existingUtilisateur.setAdresse(chefAppartement.getAdresse());
		existingUtilisateur.setTel(chefAppartement.getTel());
		existingUtilisateur.setCin(chefAppartement.getCin());
		existingUtilisateur.setDateNaissance(chefAppartement.getDateNaissance());
		existingUtilisateur.setEtat(chefAppartement.isEtat());
		existingUtilisateur.setEmail(chefAppartement.getEmail());
		existingUtilisateur.setDateEmbauche(chefAppartement.getDateEmbauche());
		existingUtilisateur.setRolesUtilisateur(chefAppartement.getRolesUtilisateur());

		return utilisateursRepo.save(existingUtilisateur);
	}

	@Override
	public Utilisateurs modifierEmployee(Long id, Employee employee) {
		utilisateurValidation.validateModification(employee); // Validation
		Employee existingUtilisateur = (Employee) utilisateursRepo.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("User not found"));

		existingUtilisateur.setNom(employee.getNom());
		existingUtilisateur.setPrenom(employee.getPrenom());
		existingUtilisateur.setAdresse(employee.getAdresse());
		existingUtilisateur.setTel(employee.getTel());
		existingUtilisateur.setCin(employee.getCin());
		existingUtilisateur.setDateNaissance(employee.getDateNaissance());
		existingUtilisateur.setEtat(employee.isEtat());
		existingUtilisateur.setEmail(employee.getEmail());
		existingUtilisateur.setDateEmbauche(employee.getDateEmbauche());
		existingUtilisateur.setRolesUtilisateur(employee.getRolesUtilisateur());

		return utilisateursRepo.save(existingUtilisateur);
	}

	@Override
	public Utilisateurs modifierChefProjet(Long id, ChefProjet chefProjet) {
		utilisateurValidation.validateModification(chefProjet); // Validation
		ChefProjet existingUtilisateur = (ChefProjet) utilisateursRepo.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("User not found"));

		existingUtilisateur.setNom(chefProjet.getNom());
		existingUtilisateur.setPrenom(chefProjet.getPrenom());
		existingUtilisateur.setAdresse(chefProjet.getAdresse());
		existingUtilisateur.setTel(chefProjet.getTel());
		existingUtilisateur.setCin(chefProjet.getCin());
		existingUtilisateur.setDateNaissance(chefProjet.getDateNaissance());
		existingUtilisateur.setEtat(chefProjet.isEtat());
		existingUtilisateur.setEmail(chefProjet.getEmail());

		existingUtilisateur.setRolesUtilisateur(chefProjet.getRolesUtilisateur());

		return utilisateursRepo.save(existingUtilisateur);
	}

	@Override
	public Utilisateurs findByIdUtilisateurs(Long id) {
		return utilisateursRepo.findById(id).get();
	}

	@Override
	public List<Utilisateurs> listUtilisateur() {
		return utilisateursRepo.findAll();
	}

	@Override
	public Utilisateurs activeDesactiveUtilisateur(Long id) {
		Utilisateurs utilisateur = utilisateursRepo.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("User not found"));
		if (utilisateur.isEtat() == true) {
			utilisateur.setEtat(false);
			return utilisateursRepo.save(utilisateur);
		} else {
			utilisateur.setEtat(true);
			return utilisateursRepo.save(utilisateur);
		}

	}

	@Override
	public Utilisateurs inscriptionAdmin(Utilisateurs utilisateurs) {
		boolean existByEmail = utilisateursRepo.existsByEmail(utilisateurs.getEmail());
		boolean adminbyRolesExists = utilisateursRepo
				.existsByRolesUtilisateurContains(Collections.singleton(rolesUtilisateurRepo.findByNomRoles("ADMIN")));

		if (!existByEmail && !adminbyRolesExists) {
			Set<RolesUtilisateur> listRolesUtilisateurs = new HashSet<>();
			RolesUtilisateur rolesUtilisateur = rolesUtilisateurRepo.findByNomRoles("ADMIN");
			listRolesUtilisateurs.add(rolesUtilisateur);
			utilisateurs.setDepartement(null);
			utilisateurs.setRolesUtilisateur(listRolesUtilisateurs);
			utilisateurs.setPassword(passwordEncoder.encode(utilisateurs.getPassword()));

			return utilisateursRepo.save(utilisateurs);
		} else {
			return null;
		}
	}
    @Override
    public Candidat addDemandeurEmploi(Candidat candidat) {
        Set<RolesUtilisateur> rolesList= new HashSet<>();
        RolesUtilisateur roles = rolesUtilisateurRepo.findByNomRoles("CANDIDAT");
        rolesList.add(roles);
        candidat.setNom(candidat.getNom());
        candidat.setPrenom(candidat.getPrenom());
        candidat.setDateNaissance(candidat.getDateNaissance());
        candidat.setAdresse(candidat.getAdresse());
        candidat.setEmail(candidat.getEmail());
        candidat.setTel(candidat.getTel());
        candidat.setEtat(true);
        candidat.setDepartement(null);
        candidat.setDateCreation(new Date());
        candidat.setPassword(passwordEncoder.encode(candidat.getPassword()));
        candidat.setRolesUtilisateur(rolesList);

        	return utilisateursRepo.save(candidat);

             
        
    }
	 @Override
	    public ChefAppartement ajouterChef(ChefAppartement chefAppartement) {
	        boolean existByEmail = utilisateursRepo.existsByEmail(chefAppartement.getEmail());
	        boolean existByCin = utilisateursRepo.existsByCin(chefAppartement.getCin());
	        boolean existByDep = chefAppartementRepo.existsByDepartement(chefAppartement.getDepartement());

	        if (!existByCin && !existByEmail && !existByDep) {
	            Set<RolesUtilisateur> listRolesUtilisateurs = new HashSet<>();
	            RolesUtilisateur rolesUtilisateur = rolesUtilisateurRepo.findByNomRoles("CHEF DAPRATEMENT");
	            listRolesUtilisateurs.add(rolesUtilisateur);
	            String plainPassword = chefAppartement.getPassword(); // Store plain password
	            chefAppartement.setPassword(passwordEncoder.encode(plainPassword));
	            chefAppartement.setRolesUtilisateur(listRolesUtilisateurs);

	            ChefAppartement savedChef = utilisateursRepo.save(chefAppartement);

	            // Send email with plain password
	            emailService.sendSimpleMessage(
	                chefAppartement.getEmail(),
	                "Account Created",
	                "Your account has been created. Your password is: " + plainPassword
	            );

	            return savedChef;
	        } else {
	            throw new IllegalArgumentException("User with given CIN, email or department already exists.");
	        }
	    }

	    @Override
	    public ChefProjet ajouterChefProjet(ChefProjet chefProjet, Long idDep) {
	        boolean existByEmail = utilisateursRepo.existsByEmail(chefProjet.getEmail());
	        boolean existByCin = utilisateursRepo.existsByCin(chefProjet.getCin());
	        Departement departement = departementRepo.findById(idDep).get();
	         
	        if (!existByCin && !existByEmail) {
	            Set<RolesUtilisateur> listRolesUtilisateurs = new HashSet<>();
	            RolesUtilisateur rolesUtilisateur = rolesUtilisateurRepo.findByNomRoles("CHEF PROJET");
	            listRolesUtilisateurs.add(rolesUtilisateur);
	            chefProjet.setDepartement(departement);
	            String plainPassword = chefProjet.getPassword(); // Store plain password
	            chefProjet.setPassword(passwordEncoder.encode(plainPassword));
	            chefProjet.setRolesUtilisateur(listRolesUtilisateurs);

	            ChefProjet savedChefProjet = utilisateursRepo.save(chefProjet);

	            // Send email with plain password
	            emailService.sendSimpleMessage(
	                chefProjet.getEmail(),
	                "Account Created",
	                "Your account has been created. Your password is: " + plainPassword
	            );

	            return savedChefProjet;
	        } else {
	            throw new IllegalArgumentException("User with given CIN, email or department already exists.");
	        }
	    }

	    @Override
	    public Employee ajouterEmployeur(Employee employee, Long idDep) {
	        boolean existByEmail = utilisateursRepo.existsByEmail(employee.getEmail());
	        boolean existByCin = utilisateursRepo.existsByCin(employee.getCin());
	        Departement departement = departementRepo.findById(idDep).get();
	     
	        if (!existByCin && !existByEmail) {
	            Set<RolesUtilisateur> listRolesUtilisateurs = new HashSet<>();
	            RolesUtilisateur rolesUtilisateur = rolesUtilisateurRepo.findByNomRoles("EMPLOYEE");
	            listRolesUtilisateurs.add(rolesUtilisateur);
	            employee.setDepartement(departement);
	            String plainPassword = employee.getPassword(); // Store plain password
	            employee.setPassword(passwordEncoder.encode(plainPassword));
	            employee.setRolesUtilisateur(listRolesUtilisateurs);

	            Employee savedEmployee = utilisateursRepo.save(employee);

	            // Send email with plain password
	            emailService.sendSimpleMessage(
	                employee.getEmail(),
	                "Account Created",
	                "Your account has been created. Your password is: " + plainPassword
	            );

	            return savedEmployee;
	        } else {
	            throw new IllegalArgumentException("User with given CIN, email or department already exists.");
	        }
	    }
 @Override
	public Utilisateurs findByEmail(String email) {
		return utilisateursRepo.findByEmail(email);
	}

	@Override
	public List<Utilisateurs> findByRole(String roleName) {
		return utilisateursRepo.findByRoleName(roleName);
	}

	@Override
	public List<ChefAppartement> findByDepartementChefAppartement(Departement departement) {
		return chefAppartementRepo.findByDepartement(departement);
	}

	@Override
	public List<Employee> findByDepartementEmployee(Departement departement) {
		return employeeRepo.findByDepartement(departement);
	}

	@Override
	public List<ChefProjet> findByDepartementChefProjet(Departement departement) {
		return chefProjetRepo.findByDepartement(departement);
	}

	@Override
	public List<Utilisateurs> getUtilisateursByRoleAndDepartment(String roleName, Long departmentId) {
		return utilisateursRepo.findUtilisateursByRoleAndDepartment(roleName, departmentId);
	}

}
