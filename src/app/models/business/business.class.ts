import { Stats } from './stats.class';
export class Business{
    id:string;
    name:string;
    lat:string;
    lng:string;
    capacity:number;
    isActive:boolean;
    stats: Stats[];
}