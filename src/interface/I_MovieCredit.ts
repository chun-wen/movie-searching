interface MovieCreditRootResponse {
  cast: Cast[];
  crew: Cast[];
  id: number;
}

interface Cast {
  adult: boolean;
  cast_id?: number;
  character?: string;
  credit_id: string;
  department?: Department;
  gender: number;
  id: number;
  job?: string;
  known_for_department: Department;
  name: string;
  order?: number;
  original_name: string;
  popularity: number;
  profile_path: null | string;
}

export enum Department {
  Acting = 'Acting',
  Art = 'Art',
  Camera = 'Camera',
  CostumeMakeUp = 'Costume & Make-Up',
  Crew = 'Crew',
  Directing = 'Directing',
  Editing = 'Editing',
  Lighting = 'Lighting',
  Production = 'Production',
  Sound = 'Sound',
  VisualEffects = 'Visual Effects',
  Writing = 'Writing',
}

export type { MovieCreditRootResponse, Cast };
