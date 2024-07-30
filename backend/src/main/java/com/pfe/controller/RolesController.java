package com.pfe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.model.RolesUtilisateur;
import com.pfe.service.RolesUtilisateurService;

@RestController
@RequestMapping(value = "/api/roles")
public class RolesController {
@Autowired
private RolesUtilisateurService rolesUtilisateurService;
@GetMapping(value = "/allRoles")
public List<RolesUtilisateur> list(){
	return rolesUtilisateurService.listRoles();
}
}
