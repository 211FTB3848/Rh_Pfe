import { RolesUtilisateur } from "./RoleUtilisateur";
import { Departement } from "./dep";

export class Utilisateur {

    id: number;
    nom: string;
    prenom: string;
    adresse: string;
    tel: string;
    cin: string;
    fonction: string;
    dateNaissance: string;
     letterMotivation: string;
    etat: boolean;
     email:string
    password:string
    departement:Departement;
    rolesUtilisateur: RolesUtilisateur[];
  }