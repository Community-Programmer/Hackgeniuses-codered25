export interface ILesson{
    lessonNumber: number;
    lessonName: string;
    objective: string;
    topic: string[];
    roadMapId?: string
  }

export interface IRoadMap{
    _id: string;
    Image: string;
    RoadMapFor: string;
    Outcome: string;
    RoadMap: ILesson[];
    userId: string;
    createdAt: Date;
  }


export interface IContent {
    _id: string;
    roadMapId: string;
    lessonId: string;
    content: string;
    userId: string;
  }