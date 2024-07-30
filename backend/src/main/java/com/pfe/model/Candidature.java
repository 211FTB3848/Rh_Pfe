package com.pfe.model;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Candidature {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String lettreMotivation;
	private boolean acepted;
	private boolean refused;
	private boolean pinding;
	private Date dateCandidture;
    @ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "idOffers")
	private OfferEmploi offerEmploi;
	@ManyToOne
	@JoinColumn(name = "idcand")
	private Candidat candidat;
	@Lob
	@Column(name = "photo", columnDefinition="LONGBLOB")
	private byte[] cv;
	private String nomFile;

}
