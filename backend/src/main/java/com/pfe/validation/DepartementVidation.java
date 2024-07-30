package com.pfe.validation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.pfe.model.Departement;

public class DepartementVidation {


	public static List<String> VALIDATIPN(Departement departement){
		List<String> listErreur= new ArrayList<>();
		if(!StringUtils.hasLength(departement.getNomDep())) {
			listErreur.add("nom departement est obligatoire ");
		}
		if(!StringUtils.hasLength(departement.getDescription())) {
			listErreur.add("Description departement est obligatoire ");

		}
		return listErreur;
	}
}
