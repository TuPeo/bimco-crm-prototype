import * as React from "jsx-dom";
import "./related-topics.scss";

export interface RelatedTopicArgs {
  title: string;
  count: number;
}

export interface RelatedTopicsArgs {
  title: string;
  topics: RelatedTopicArgs[];
}

export const RelatedTopics = ({
  title,
  topics
}: RelatedTopicsArgs) => {
  return <div class="related-topics">
    <h4 class="related-topics__title">{title}</h4>
    <div class="related-topics__topics">
      {topics.map(topic => (
        <div class="related-topics__topic">
          <h5 class="related-topics__topic-title">{topic.title}</h5>
          <div class="related-topics__topic-count">{topic.count}</div>
        </div>
      ))}
    </div>
  </div>
}