package com.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.model.Utilisateurs;
import com.pfe.model.auth.RequestToken;
import com.pfe.model.auth.ResponseToken;
import com.pfe.repository.UtilisateursRepo;
import com.pfe.service.UtilisateurService;
import com.pfe.utils.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {


	@Autowired
	private UtilisateursRepo utilisateurRepo;
	@Autowired
	private UtilisateurService utilisateurService;
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private com.pfe.configuration.CustomUserDetailService userDetailsService;

	@Autowired
	private JwtUtils jwtUtil;
	
	 
	@PostMapping(value = "/login")
	public ResponseEntity<ResponseToken> authenticate(@RequestBody RequestToken request) {
	    try {
	        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
	        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
	        final Utilisateurs user = utilisateurRepo.findByEmail(request.getEmail());
	        final String jwt = jwtUtil.generateToken(userDetails);
	        return ResponseEntity.ok(ResponseToken.builder().token(jwt).utilisateurs(user).build());
	    } catch (BadCredentialsException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}

	@GetMapping("/getConnectedUser")
	public ResponseEntity<Utilisateurs> getConnectedUser(HttpServletRequest request, HttpServletResponse response) {
		String token = request.getHeader("Authorization");

		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7); // Remove "Bearer " prefix

			String username = jwtUtil.extractUsername(token);
			Utilisateurs utilisateurs = utilisateurService.findByEmail(username);

			return ResponseEntity.ok(utilisateurs);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	@PostMapping(value = "/saveAdmin")
	public Utilisateurs ajouterAdmin(@RequestBody Utilisateurs utilisateurs) {
		return utilisateurService.inscriptionAdmin(utilisateurs);
	}
	
}
