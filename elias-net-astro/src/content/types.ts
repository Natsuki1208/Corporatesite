export interface Service {
  id: string;
  title: string;
  strongTitle: string;
  scope: string;
  copy: string;
  scenario: string;
}

export interface Solution {
  id: number;
  title: string;
  problem: string;
  method: string;
  outcome: string;
  fit: string;
}
