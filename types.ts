
export enum Intensity {
  MILD = '순한맛',
  SPICY = '매운맛',
  HELL = '지옥맛',
}

export enum Tone {
  BASIC = '기본',
  SWEET = '다정',
  CASUAL = '반말',
  POLITE = '존댓말',
  SAGEUK = '사극체',
  MANIC = '광기',
  TSUNDERE = '츤데레',
  NOVEL = '인소체',
}

export enum Relationship {
  PARENT = '부모님',
  FRIEND = '친구',
  CRUSH = '썸남녀',
  LOVER = '연인',
  IDOL = '최애',
  SENIOR = '선배',
  JUNIOR = '후배',
  OTHER = '기타',
}

export interface FormData {
  name: string;
  relationship: Relationship | '';
  description: string;
  intensity: Intensity;
  tone: Tone;
}

export interface GeneratedResult {
  text: string;
  timestamp: number;
}
