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
public class Conge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int  numberJours;
	private Date datedebutConge;
	private Date dateFinConge;
	private boolean etat;
	private boolean pinding;
	private String reason;
	@ManyToOne
	@JoinColumn(name = "id_employeur")
	private Utilisateurs employeur;
}
