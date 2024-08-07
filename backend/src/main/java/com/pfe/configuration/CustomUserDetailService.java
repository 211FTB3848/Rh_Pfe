package com.pfe.configuration;

 import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.pfe.model.Utilisateurs;
import com.pfe.repository.UtilisateursRepo;
 
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
	@Autowired
	private UtilisateursRepo utilisateurRepo;
		
		@Override
		public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
			// TODO Auto-generated method stub
			Utilisateurs utilisateur= utilisateurRepo.findByEmail(username);
			if(utilisateur == null) {
				throw new UsernameNotFoundException("utilisateur n'exist pas "+username);
			}
			return new User(utilisateur.getEmail(),utilisateur.getPassword(),utilisateur.getRolesUtilisateur(). stream()
	                .map(role ->
	                new SimpleGrantedAuthority("ROLE_"+role.getNomRoles()))
	                  .collect(Collectors
	                     .toList()));
		
		}
}
