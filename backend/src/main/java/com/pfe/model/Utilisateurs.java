package com.pfe.model;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)  

public class Utilisateurs {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id ; 
private String nom ;
private String prenom ;
private String adresse;
private String tel;
private String cin;
private Date dateNaissance;
private String email;
private String password;
private boolean etat;
@ManyToOne
@JoinColumn(name = "id_dep")
private Departement departement;
@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
@JoinTable(name= "UTILISATEUR_ROLE",
      joinColumns = {@JoinColumn(name= "ID_UTILISATEUR")
      },
     inverseJoinColumns = {
		@JoinColumn(name = "ID_ROLE")
})
private Set<RolesUtilisateur> rolesUtilisateur;


}
