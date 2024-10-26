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

export default Candidate;