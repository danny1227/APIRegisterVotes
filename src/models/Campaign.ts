

class Campaign {
    id: number;
    title:string;
    description:string;
    isEnabled: boolean;
    candidates: Array<Candidate>;

    constructor(id:number, title:string, description:string, isEnabled:boolean, candidates:Array<Candidate>){
        this.id =id;
        this.title = title;
        this.description = description;
        this.isEnabled = isEnabled;
        this.candidates = candidates;
    }
}

class Candidate{
    id: number;
    name: string;
    description: string;
    faculty: string;
    campaignId: number;
    votes: number;

    constructor(id: number, name: string, description: string, faculty: string, campaignId: number, votes: number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.faculty = faculty;
        this.campaignId = campaignId;
        this.votes = votes;
    }
}

export default Campaign;