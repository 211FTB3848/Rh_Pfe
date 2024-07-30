package com.pfe.model;

 
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
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TacheProjet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nomTache;
	private String description;
	private boolean etat;
	@Lob
	@Column(name = "doc", columnDefinition="LONGBLOB")	
		private byte[]  doc;
	private String nomDoc;
	@ManyToOne
	@JoinColumn(name = "id_employeur")
	private Utilisateurs employeur;
	@ManyToOne
	@JoinColumn(name = "id_projet")
	private Projet projet;
}
