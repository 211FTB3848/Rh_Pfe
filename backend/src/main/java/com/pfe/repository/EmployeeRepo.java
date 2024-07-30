package com.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.model.ChefProjet;
import com.pfe.model.Departement;
import com.pfe.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long>{
	boolean existsByDepartement(Departement departement);
	List<Employee> findByDepartement(Departement departement);
}
