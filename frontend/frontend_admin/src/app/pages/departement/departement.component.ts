import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Departement } from 'src/app/_MonClasses/dep';
import { DepartementService } from 'src/app/_MonServices/dep.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

  listDep: Departement[];
  dep: Departement = {
    id: 0,
    nomDep: '',
    description: ''
  };
  message: string;
  searchTerm: string = '';

  constructor(private router: Router, private depService: DepartementService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.depService.getAllDep().subscribe((data: Departement[]) => {
      this.listDep = data;
    });
  }

  ajouterDepartment(form: NgForm) {
    if (this.dep.id) {
      this.depService.addNewDep(this.dep).subscribe((data: Departement) => {
        if (data !== null) {
          alert("Département mis à jour avec succès");
          this.router.navigate(['/departments']).then(() => {
            location.reload()
          });
        } else {
          alert("Le nom du département existe déjà");
          this.router.navigate(['/departments']).then(() => {
            location.reload()
          });
        }
        this.resetForm(form);
      });
    } else {
      this.depService.addNewDep(this.dep).subscribe((data: Departement) => {
        if (data !== null) {
          alert("Département ajouté avec succès");
          this.router.navigate(['/departments']).then(() => {
            location.reload()
          });
        } else {
          alert("Le nom du département existe déjà");
          this.router.navigate(['/departments']).then(() => {
            location.reload()
          });
        }
        this.resetForm(form);
      });
    }
  }

  update(id: number) {
    this.depService.findByIdDep(id).subscribe((data: Departement) => {
      this.dep = data;
    });
  }

  deleteDepartment(id: number) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce département?")) {
      this.depService.deleteByID(id).subscribe(() => {
        alert("Department Supprimer ")
        this.router.navigate(['/departments']).then(()=>{
          location.reload()
        })
      });
    }  
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.dep = {
      id: 0,
      nomDep: '',
      description: ''
    };
  }

  filteredDepartments(): Departement[] {
    if (!this.searchTerm) {
      return this.listDep;
    }
    return this.listDep.filter(dep =>
      dep.nomDep.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
