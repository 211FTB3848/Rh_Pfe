package com.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.FicheDePaie;
 
 
public interface FicheDePaieRepo extends JpaRepository<FicheDePaie, Long> {
	 
}
