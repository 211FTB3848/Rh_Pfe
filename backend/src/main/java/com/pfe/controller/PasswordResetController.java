package com.pfe.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.model.Utilisateurs;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.impl.PasswordResetService;

@RestController
@RequestMapping("/api")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;
    @Autowired
    private UtilisateursRepo utilisateursRepo;

    @PostMapping("/forgotPassword/{email}")
    public void forgotPassword(@PathVariable  String email) {
        Utilisateurs utilisateur = utilisateursRepo.findByEmail(email);

        String token = UUID.randomUUID().toString();
         passwordResetService.createPasswordResetTokenForUser(utilisateur, token);
           }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token,
                                                 @RequestParam("newPassword") String newPassword) {
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Mot de passe réinitialisé avec succès.");
    }
}
