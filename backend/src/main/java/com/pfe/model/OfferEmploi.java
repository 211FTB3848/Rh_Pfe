package com.pfe.model;

import java.util.Date;

import jakarta.persistence.Column;
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
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OfferEmploi {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String titre;
@Column(length = 9999)
 private String resumePoste;
private String typeOfferEmploi;
private String location;
private double salMax , salMin;
private Date dateCreation;
private Date dateExpiraton;
private boolean etat;
 private boolean enattent;
 

@ManyToOne
@JoinColumn(name = "id_dep") 
private Departement departement;
}
