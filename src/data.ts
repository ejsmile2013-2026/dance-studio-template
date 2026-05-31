/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DanceStyle, StudioInfo } from "./types";
import heroImageSrc from "./assets/images/dance_studio_hero_1780161171975.png";

export const heroImage = heroImageSrc;

export const STUDIO_CONFIG: StudioInfo = {
  name: "Rising Stars Dance Academy",
  academyName: "Rising Stars Dance Academy",
  mainTitle: "Book Your Child's Free Trial Dance Class in Concord",
  description:
    "Answer 4 quick questions and we'll match your child with the perfect class — no phone tag, no waiting.",
  address: "4850 Concord Blvd, Concord, CA 94521",
  phone: "+1 (415) 613-9969",
  email: "hello@risingstars.dance",
  workingHours: "Mon–Sat: 10 AM – 8 PM  ·  Sun: Closed",
  benefits: [
    {
      title: "Small Groups — 10 Kids Max",
      description:
        "Every child receives direct attention from the instructor, with personal feedback on posture and technique every single class.",
      icon: "Users",
    },
    {
      title: "Professional Sprung Floor",
      description:
        "Our shock-absorbing hardwood floor protects growing joints and lets students train with confidence.",
      icon: "Sparkles",
    },
    {
      title: "Twice-Yearly Recitals",
      description:
        "Students perform on a real stage twice a year in full costume — a milestone every family looks forward to.",
      icon: "Award",
    },
  ],
};

export const DANCE_STYLES: DanceStyle[] = [
  {
    id: "ballet",
    title: "Classical Ballet",
    description:
      "Builds posture, flexibility, and musical awareness through the timeless foundations of classical technique.",
    ageGroups: "Ages 3–10",
    imageUrl: "/class-images/classical_ballet.png",
    tags: ["Posture", "Flexibility", "Ballet"],
  },
  {
    id: "contemporary",
    title: "Contemporary / Modern",
    description:
      "Self-expression, improvisation, and floorwork — ideal for children ready to explore movement creatively.",
    ageGroups: "Ages 7–15",
    imageUrl: "/class-images/contemporary_modern.png",
    tags: ["Expression", "Fluidity", "Improv"],
  },
  {
    id: "hiphop",
    title: "Hip-Hop & Street Styles",
    description:
      "High-energy movement, coordination, and confidence — covering breaking, popping, locking, and jazz-funk for teens.",
    ageGroups: "Ages 6–17",
    imageUrl: "/class-images/hiphop_street.png",
    tags: ["Energy", "Groove", "Jazz-Funk"],
  },
  {
    id: "rhythmics",
    title: "Creative Movement & Baby Dance",
    description:
      "Playful, game-based learning for the youngest dancers — building listening, coordination, and teamwork.",
    ageGroups: "Ages 3–5",
    imageUrl: "/class-images/creative_movement.png",
    tags: ["Play", "Coordination", "Music"],
  },
];

export const AGE_QUESTIONS = [
  {
    id: "3-5",
    label: "Ages 3–5",
    subtitle: "Little Movers — Creative Movement & Baby Dance",
  },
  {
    id: "6-8",
    label: "Ages 6–8",
    subtitle: "Junior Group — Ballet foundations, posture & rhythm",
  },
  {
    id: "9-12",
    label: "Ages 9–12",
    subtitle: "Senior Group — Contemporary, hip-hop & musical theater",
  },
  {
    id: "13-17",
    label: "Ages 13–17",
    subtitle: "Teen Group — Jazz-funk, hip-hop & contemporary",
  },
];

export const START_QUESTIONS = [
  {
    id: "asap",
    label: "As soon as possible",
    subtitle: "I'd like to join the next available class",
  },
  {
    id: "weeks",
    label: "Within 1–2 weeks",
    subtitle: "Finding a day and time that works for our schedule",
  },
  {
    id: "month",
    label: "Next month",
    subtitle: "Planning ahead for a scheduled start",
  },
  {
    id: "consult",
    label: "Just exploring for now",
    subtitle: "I'd like more details before deciding",
  },
];
