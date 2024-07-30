package com.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pfe.model.Departement;
import com.pfe.model.OfferEmploi;
 

public interface OfferEmploiRepo extends JpaRepository<OfferEmploi, Long>{
     List<OfferEmploi> findByDepartement(Departement departement);
 }
