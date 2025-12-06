
import { Intensity, Relationship, Tone } from './types';

export const RELATIONSHIP_OPTIONS = [
  { value: Relationship.PARENT, label: '부모님 👨‍👩‍👧‍👦' },
  { value: Relationship.FRIEND, label: '친구 🤜🤛' },
  { value: Relationship.CRUSH, label: '썸남녀 🫣' },
  { value: Relationship.LOVER, label: '연인 💖' },
  { value: Relationship.IDOL, label: '최애 🌟' },
  { value: Relationship.SENIOR, label: '선배 🫡' },
  { value: Relationship.JUNIOR, label: '후배 🐣' },
  { value: Relationship.OTHER, label: '기타 🎸' },
];

export const INTENSITY_OPTIONS = [
  { value: Intensity.MILD, label: '순한맛', emoji: '😊', desc: '귀엽고 따뜻하게' },
  { value: Intensity.SPICY, label: '매운맛', emoji: '🔥', desc: '과몰입 팬덤 느낌' },
  { value: Intensity.HELL, label: '지옥맛', emoji: '☄️', desc: '극한의 주접' },
];

export const TONE_OPTIONS = [
  { value: Tone.BASIC, label: '기본 (AI 추천)', emoji: '🤖', desc: '관계에 딱 맞는 말투로' },
  { value: Tone.SWEET, label: '다정 (스윗함)', emoji: '🍯', desc: '꿀 떨어지는 말투' },
  { value: Tone.CASUAL, label: '반말 (친근)', emoji: '🗣️', desc: '야! 너! 하는 사이' },
  { value: Tone.POLITE, label: '존댓말 (정중)', emoji: '🙇‍♂️', desc: '당신은... 그대는...' },
  { value: Tone.TSUNDERE, label: '츤데레 (새침)', emoji: '😒', desc: '흥, 딱히 널 위한 건 아냐' },
  { value: Tone.MANIC, label: '광기 (절규)', emoji: '📢', desc: '으아악!!! 미친거아냐?!' },
  { value: Tone.SAGEUK, label: '사극체 (비장)', emoji: '📜', desc: '통촉하여 주시옵소서' },
  { value: Tone.NOVEL, label: '인소체 (그시절)', emoji: '✨', desc: '^-^... 넌 내꺼야 ㅎ' },
];
