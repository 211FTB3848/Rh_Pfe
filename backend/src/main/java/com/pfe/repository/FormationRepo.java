package com.pfe.repository;

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pfe.model.Departement;
import com.pfe.model.Formation;

import jakarta.transaction.Transactional;
 
 
 
public interface FormationRepo extends JpaRepository<Formation, Long> {
	List<Formation> findByDepartement(Departement departement);

	  @Modifying
	    @org.springframework.transaction.annotation.Transactional
	    @Query("DELETE FROM Formation f WHERE f.id = :formationId")
	    void deleteFormationMembersByFormation(@Param("formationId") Long formationId);

	    @Modifying
	    @org.springframework.transaction.annotation.Transactional
	    @Query(value = "DELETE FROM formation_members WHERE member_id = :memberId", nativeQuery = true)
	    void deleteFormationMembersByMember(@Param("memberId") Long memberId);
}
