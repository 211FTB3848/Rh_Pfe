package com.pfe.validation;

import com.pfe.model.Utilisateurs;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Date;

@Component
public class UtilisateurValidation {

    public void validateAjout(Utilisateurs utilisateurs) {
        validateCommon(utilisateurs);
    }

    public void validateModification(Utilisateurs utilisateurs) {
        validateCommon(utilisateurs);
    }

    private void validateCommon(Utilisateurs utilisateurs) {
        if (!StringUtils.hasText(utilisateurs.getNom())) {
            throw new IllegalArgumentException("Name is required.");
        }
        if (!StringUtils.hasText(utilisateurs.getPrenom())) {
            throw new IllegalArgumentException("Surname is required.");
        }
        if (!StringUtils.hasText(utilisateurs.getEmail())) {
            throw new IllegalArgumentException("Email is required.");
        }
        if (!StringUtils.hasText(utilisateurs.getCin())) {
            throw new IllegalArgumentException("CIN is required.");
        }
        if (!StringUtils.hasText(utilisateurs.getPassword())) {
            throw new IllegalArgumentException("Password is required.");
        }
        if (utilisateurs.getDateNaissance() == null || utilisateurs.getDateNaissance().after(new Date())) {
            throw new IllegalArgumentException("Date of birth must be in the past.");
        }
      
        // Add other validations as needed
    }
}
