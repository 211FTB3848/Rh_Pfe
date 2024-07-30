package com.pfe.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.pfe.model.Candidat;
import com.pfe.model.Candidature;
import com.pfe.model.Departement;
import com.pfe.service.CandidatureServices;
import com.pfe.service.DepartementService;
import com.pfe.service.UtilisateurService;

import jakarta.annotation.Resource;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/candidature")
public class CandidatureController {

    @Autowired
    private CandidatureServices candidatureServices;
    @Autowired
private UtilisateurService utilisateurService;
    @Autowired
    private DepartementService departementService;
    @PostMapping(value = "/save")
    public Candidature saveCandidature(@RequestPart("candidature")  Candidature candidature,
    		@RequestPart("cv")MultipartFile cv , @RequestParam Long idCan ,@RequestParam Long idOffer) {
    	try {
			candidature.setCv(cv.getBytes());
			candidature.setNomFile(cv.getOriginalFilename());
			return candidatureServices.saveCandidature(candidature, idCan, idOffer) ;

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
    }

    @GetMapping(value = "/byCandidat/{id}")
    public List<Candidature> findByCandidat(@PathVariable Long id) {
        Candidat candidat = (Candidat) utilisateurService.findByIdUtilisateurs(id); 
         return candidatureServices.findByCandidat(candidat);
    }
    @GetMapping(value = "/byDep/{id}")
    public List<Candidature> byDep(@PathVariable Long id) {
        Departement departement = departementService.findByIdDepartement(id); 
        return candidatureServices.findByOfferEmploi_Departement(departement);
    }
    @GetMapping(value = "/all")
    public List<Candidature> all() {
         return candidatureServices.all();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Candidature> findById(@PathVariable Long id) {
        Candidature candidature = candidatureServices.findById(id);
        return candidature != null ? ResponseEntity.ok(candidature) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        candidatureServices.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/accept/{id}")
    public Candidature acceptCandidature(@PathVariable Long id) {
        return candidatureServices.acceptCandidature(id);
     }

     @GetMapping("/reject/{id}")
    public Candidature rejectCandidature(@PathVariable Long id) {
        return  candidatureServices.rejectCandidature(id);
     }
     @GetMapping("/download/{id}")
     public ResponseEntity<ByteArrayResource> downloadCv(@PathVariable Long id) {
         Candidature candidature = candidatureServices.findById(id);

         if (candidature == null) {
             return ResponseEntity.notFound().build();
         }

         return ResponseEntity.ok()
             .contentType(MediaType.APPLICATION_OCTET_STREAM)
             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + candidature.getNomFile() + "\"")
             .body(new ByteArrayResource(candidature.getCv()));
     }
}
