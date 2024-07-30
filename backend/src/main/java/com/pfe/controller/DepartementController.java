package com.pfe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.model.Departement;
import com.pfe.service.DepartementService;

@RestController
@RequestMapping(value = "/api/dep")
public class DepartementController {

	@Autowired
	private DepartementService departementService;
	
	@PostMapping(value = "/save")
	public Departement saveDepartement(@RequestBody Departement departement) {
		return departementService.saveOrUpdateDepartement(departement);
	}
	@GetMapping(value = "/list")
public List<Departement> listDep(){
	return departementService.listDepartements();
}	
	@GetMapping(value = "/listCandidat")
public List<Departement> listCandidat(){
	return departementService.listDepartements();
}
	@GetMapping(value = "/byId/{id}")
public Departement findById(@PathVariable Long id){
	return departementService.findByIdDepartement(id);
}
	@DeleteMapping(value = "/deleteById/{id}")
public void deleteById(@PathVariable Long id){
	  departementService.deletDepartement(id);
}
}
