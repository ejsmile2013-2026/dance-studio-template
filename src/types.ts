/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizAnswers {
  childAge: string;
  danceDirection: string;
  startDate: string;
  parentName: string;
  childName: string;
  phoneNumber: string;
  preferredContact: "whatsapp" | "telegram" | "phone";
}

export interface Submission extends QuizAnswers {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
}

export interface DanceStyle {
  id: string;
  title: string;
  description: string;
  ageGroups: string;
  imageUrl: string;
  tags: string[];
}

export interface StudioInfo {
  name: string;
  academyName: string;
  mainTitle: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  benefits: { title: string; description: string; icon: string }[];
}
