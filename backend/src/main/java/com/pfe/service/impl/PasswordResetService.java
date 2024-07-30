package com.pfe.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pfe.model.PasswordResetToken;
import com.pfe.model.Utilisateurs;
import com.pfe.repository.PasswordResetTokenRepository;
import com.pfe.repository.UtilisateursRepo;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepo;

    @Autowired
    private UtilisateursRepo utilisateursRepo;

    @Autowired
    private JavaMailSender mailSender;

    public void createPasswordResetTokenForUser(Utilisateurs utilisateur, String token) {
        PasswordResetToken myToken = new PasswordResetToken();
        myToken.setToken(token);
        myToken.setExpiryDate(LocalDateTime.now().plusHours(1)); // Validité de 1 heure
        myToken.setUtilisateur(utilisateur);
        tokenRepo.save(myToken);

        String resetUrl = "http://localhost:4200/reinitailmotdepass?token=" + token;
        sendEmail(utilisateur.getEmail(), resetUrl);
    }

    private void sendEmail(String to, String resetUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Réinitialisation de Mot de Passe");
        message.setText("Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : " + resetUrl);
        mailSender.send(message);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepo.findByToken(token)
            .orElseThrow(() -> new IllegalArgumentException("Token invalide"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Token expiré");
        }

        Utilisateurs utilisateur = resetToken.getUtilisateur();
        utilisateur.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        utilisateursRepo.save(utilisateur);
        tokenRepo.delete(resetToken);
    }
}

