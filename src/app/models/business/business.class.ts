import { Stats } from './stats.model';
export class Business{
    id:string;
    name:string;
    lat:string;
    lng:string;
    capacity:number;
    isActive:boolean;
    stats: Stats[];
}