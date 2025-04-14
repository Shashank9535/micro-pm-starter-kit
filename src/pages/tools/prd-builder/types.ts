
export interface Feature {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Must Have' | 'Should Have' | 'Nice to Have';
}

export interface PRDState {
  title: string;
  author: string;
  date: string;
  version: string;
  sections: {
    [key: string]: string;
  };
  features: Feature[];
}

export interface TemplateSection {
  id: string;
  title: string;
  description: string;
  placeholder: string;
}
