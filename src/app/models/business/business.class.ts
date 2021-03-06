import { Stats } from './stats.class';

export class Business{
    id: string;
    name: string;
    lat: number;
    lng: number;
    category: string;
    capacity: number;
    isActive: boolean;
    stats: Stats[];
}
