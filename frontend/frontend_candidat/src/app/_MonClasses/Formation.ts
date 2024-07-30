import { Departement } from "./dep";
import { Utilisateur } from "./Utilisateur";

export class Formation {
  id:number
    description: string;
    titre: string;
    datedebut: string;
    datefin: string;
    categorieFormation: string;
    departement: Departement;
    members:Utilisateur[]
     formateur: Utilisateur;
   }