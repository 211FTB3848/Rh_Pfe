import { Utilisateur } from './Utilisateur';

export class Conge {
    id: number;
    numberJours: number;
    datedebutConge: string;
    dateFinConge: string;
    etat: boolean;
    pinding:boolean;
    reason: string;
    employeur: Utilisateur;
}
