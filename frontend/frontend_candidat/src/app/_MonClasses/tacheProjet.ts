import { Projet } from "./projet";
import { Utilisateur } from "./Utilisateur";

export class TacheProjet{
        id:number;
	    nomTache:string;
	    description:string;
 	   employeur:Utilisateur;
		nomDoc:string
		doc:string
 	   projet:Projet;
	   etat:boolean
}