import { Departement } from "./dep";
import { Utilisateur } from "./Utilisateur";

export class Projet{
        id : number;
	    description :string;
	     titre :string;
	    datedebut :string;
	    datefin :string;
        dateCreation:string
	 
		chefProjet :Utilisateur;	
		departement:Departement 
}