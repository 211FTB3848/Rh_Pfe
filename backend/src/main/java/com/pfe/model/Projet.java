package com.pfe.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Projet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String description;
	private String  titre;
	private Date datedebut;
	private Date datefin;
	private Date dateCreation;
	private Date dateModification;
	@ManyToOne
	@JoinColumn(name = "id_chef")
	private ChefProjet chefProjet;
@ManyToOne
@JoinColumn(name = "id_dep")
private Departement departement;
 
}
