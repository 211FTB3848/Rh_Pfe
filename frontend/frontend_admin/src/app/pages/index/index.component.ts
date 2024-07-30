import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { DepartementService } from 'src/app/_MonServices/dep.service';
 import { Departement } from 'src/app/_MonClasses/dep';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';
import { ProjetService } from 'src/app/_MonServices/projet.service';
import { Projet } from 'src/app/_MonClasses/projet';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  listemp: Utilisateur[];
  departements: Departement[];
  employeesByDepartmentChart: Chart<"pie", any[], any>;
  nbrD: number;
  nbE: number;
  nbrP: number;
  listChefDepartment: Utilisateur[];
  projets: Projet[];
  projectsByDepartmentChart: Chart<"bar", any[], any>;

  constructor(
    private adminService: AdminService,
    private utilisateurService: UtilisateurService,
    private departementService: DepartementService,
    private projetService: ProjetService
  ) { }

  ngOnInit(): void {
    this.loadEmployee();
    this.loadDepartements();
    this.loadChefDepartments();
    this.loadProjects();
  }

  loadProjects() {
    this.projetService.getAllProjet().subscribe((data: Projet[]) => {
      this.projets = data;
      this.createProjectsByDepartmentChart();
    });
  }

  loadEmployee() {
    this.utilisateurService.getAllEmp().subscribe((data: Utilisateur[]) => {
      this.listemp = data;
      this.nbE = data.length;
      this.createEmployeesByDepartmentChart();
    });
  }

  loadChefDepartments() {
    this.utilisateurService.getAllChefDepartment().subscribe(data => {
      this.listChefDepartment = data;
      this.nbrP = data.length;
    });
  }

  loadDepartements() {
    this.departementService.getAllDep().subscribe((data: Departement[]) => {
      this.departements = data;
      this.nbrD = data.length;
    });
  }

  createEmployeesByDepartmentChart() {
    if (!this.listemp || !this.departements) {
      return;
    }
  
    const departmentNames = this.departements.map(dep => dep.nomDep);
    const employeeCounts = this.departements.map(dep =>
      this.listemp.filter(emp => emp.departement?.id === dep.id).length
    );
  
    const ctx = document.getElementById('employeesByDepartmentChart') as HTMLCanvasElement;
    if (ctx) {
      this.employeesByDepartmentChart = new Chart(ctx, {
        type: 'pie', // Change chart type to 'pie' for circular chart
        data: {
          labels: departmentNames,
          datasets: [{
            label: 'Number of Employees',
            data: employeeCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
              // Add more colors as needed
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const label = tooltipItem.label || '';
                  const value = tooltipItem.raw || '';
                  return `${label}: ${value}`;
                }
              }
            }
          }
        }
      });
    }
  }
  

  createProjectsByDepartmentChart() {
    if (!this.projets || !this.departements) {
      return;
    }

    const departmentNames = this.departements.map(dep => dep.nomDep);
    const projectCounts = this.departements.map(dep =>
      this.projets.filter(projet => projet.departement?.id === dep.id).length
    );

    const ctx = document.getElementById('projectsByDepartmentChart') as HTMLCanvasElement;
    if (ctx) {
      this.projectsByDepartmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: departmentNames,
          datasets: [{
            label: 'Number of Projects',
            data: projectCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
              // Add more colors as needed
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
