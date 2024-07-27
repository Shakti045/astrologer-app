interface Astrologer {
    name: string;
    experience: number;
    languages: string[];
    experties: string[];
    price: number;
    imageUrl: string;
    bio: string;
}

interface AstrologersFromApi {
    _id:string;
    name: string;
    experience: number;
    languages: string[];
    experties: string[];
    price: number;
    imageUrl: string;
}

interface AstrologerFullDetails {
    _id:string;
    name: string;
    experience: number;
    languages: string[];
    experties: string[];
    price: number;
    imageUrl: string;
    bio: string;
}

interface FilterProps {
    languages:string[];
    experties:string[];
    sortvalue:number;
}

