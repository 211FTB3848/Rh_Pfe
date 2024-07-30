import { Candidat } from "./candidat";
import { OfferEmploi } from "./OfferEmploi";

 

export class Candidature {
    id: number;
    lettreMotivation: string;
    offerEmploi: OfferEmploi;
     acepted: boolean;
     cv:string
    refused: boolean;
    pinding: boolean;
    dateCandidture: string;
     candidat:Candidat
     nomFile:string
}