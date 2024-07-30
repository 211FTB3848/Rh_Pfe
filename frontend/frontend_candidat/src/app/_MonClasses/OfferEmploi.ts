import { Departement } from "./dep";

export class OfferEmploi{
    id: number; // Changed from private Long to public number
    titre: string;
    resumePoste: string; // Changed from private String to public string
    typeOfferEmploi: string;
    location: string;
    salMax: number; // Changed from private double to public number
    salMin: number; // Changed from private double to public number
    dateCreation: string; // Kept as Date type
    dateExpiraton: string; // Kept as Date type
    etat: boolean;
    enattent: boolean;
    departement:Departement
}