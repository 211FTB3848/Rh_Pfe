package com.pfe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.model.RolesUtilisateur;
import com.pfe.repository.RolesUtilisateurRepo;
import com.pfe.service.RolesUtilisateurService;
@Service
public class RolesUtilisateurServiceImpl implements RolesUtilisateurService {
@Autowired
private RolesUtilisateurRepo rolesUtilisateurRepo;
	@Override
	public List<RolesUtilisateur> listRoles() {
		// TODO Auto-generated method stub
		return rolesUtilisateurRepo.findAll();
	}

}
