package com.pfe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

 import com.pfe.model.Departement;
 import com.pfe.model.OfferEmploi;
 import com.pfe.repository.DepartementRepo;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.DepartementService;
import com.pfe.service.OfferEmploiServices;

@RestController
@CrossOrigin
 
@RequestMapping(value = "/api/offerEmploi")
public class OfferEmploiController {
@Autowired
	private OfferEmploiServices offerEmploiServices;
	@Autowired
	private UtilisateursRepo utilisateurServices;
	@Autowired
	DepartementService departementService;
	@PostMapping(value = "/save")
	public ResponseEntity<OfferEmploi> addNewOffer(@RequestBody OfferEmploi offerEmploi
			,@RequestParam Long idDep
									 ){
		return ResponseEntity.ok( offerEmploiServices.addNewOfferEmploi(offerEmploi, idDep));
	}
	 @GetMapping(value = "/findOfferByDep/{id}")
	public List<OfferEmploi> findByDepartement(@PathVariable("id") Long id) {
		 Departement departement=   departementService.findByIdDepartement(id);
 		return offerEmploiServices.findByDepartement(departement);
	}
	 @GetMapping(value = "/byId/{id}")
		public OfferEmploi findByID(@PathVariable("id") Long id) {
  			return offerEmploiServices.findByIdOfferEmploi(id);	
  					}
	 
	  
	 @GetMapping(value = "/allForAdmin")
	public List<OfferEmploi> allForAdmin() {
 		return offerEmploiServices.offerEmplois();
	}
	 @PutMapping(value = "/update/{id}")
	 public ResponseEntity<OfferEmploi> updateOffer(
	     @PathVariable("id") Long id, 
	     @RequestBody OfferEmploi offerEmploi) {
	     OfferEmploi updatedOffer = offerEmploiServices.updateOfferEmploi(id, offerEmploi);
	     return ResponseEntity.ok(updatedOffer);
	 }
 
	 @GetMapping(value = "/all")
		public List<OfferEmploi> all() {
	 		return offerEmploiServices.offerEmplois();
		}
	 @DeleteMapping(value = "/delete/{id}")
	 public ResponseEntity<Void> deleteOffer(@PathVariable("id") Long id) {
	     offerEmploiServices.deleteOfferEmploi(id);
	     return ResponseEntity.noContent().build(); // Return 204 No Content status
	 }

}

