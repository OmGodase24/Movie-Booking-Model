export interface Ticket {
    seatNumber: string;
    status: string;
  }
  
  export interface Movie {
    _id?: string;
    title: string;
    genre: string;
    rating: number;
    releaseDate: Date;
    theatre: string;
    ticketsAvailable: number;
    tickets?: Ticket[];  // Add this if tickets exist
  }
  