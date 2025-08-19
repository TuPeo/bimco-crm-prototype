import * as React from "jsx-dom";

import "./schedule-card.scss";

export interface ScheduleCardProps {
  title: string;
  description: string;
  month: string;
  day: number;
}

export const ScheduleCard = ({
  title,
  description,
  month,
  day}: ScheduleCardProps) => {
  return (
    <a class="schedule-card" href="/">
      <div class="schedule-card__date">
        <span class="schedule-card__month">{month}</span>
        <span class="schedule-card__day">{day}</span>
      </div>

      <div class="schedule-card__event-info">
        <span class="schedule-card__title">{title}</span>
        <span class="schedule-card__description">{description}</span>
      </div>
    </a>
  )
}