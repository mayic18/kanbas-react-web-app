export interface Assignment {
    _id: string;
    title: string;
    course: string;
    description?: string;
    points?: number;
    dueDate?: string;
    availableFrom?: string;
    availableUntil?: string;
  }