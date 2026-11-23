//---------- Hooks ----------
import { useWorkspace } from "./use-workspace";

//---------- Types ----------
import type { Skill, SkillRating, Topic } from "../types/workspace";

function createId() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function useTopicActions() {
  const { commit } = useWorkspace();

  function changeTopic(topicId: string, change: (topic: Topic) => Topic) {
    commit((workspace) => {
      if (!workspace.topics.some((topic) => topic.id === topicId)) {
        throw new Error("Topic no longer exists.");
      }

      return {
        ...workspace,
        topics: workspace.topics.map((topic) => topic.id === topicId ? change(topic) : topic),
      };
    });
  }

  return {
    createTopic(name: string) {
      const topic: Topic = { id: createId(), name, skills: [] };
      commit((workspace) => ({ ...workspace, topics: [...workspace.topics, topic] }));
      return topic.id;
    },
    renameTopic(topicId: string, name: string) {
      changeTopic(topicId, (topic) => ({ ...topic, name }));
    },
    deleteTopic(topicId: string) {
      commit((workspace) => ({
        ...workspace,
        topics: workspace.topics.filter((topic) => topic.id !== topicId),
      }));
    },
    createSkill(topicId: string, name: string, rating: SkillRating) {
      const skill: Skill = { id: createId(), name, rating };
      changeTopic(topicId, (topic) => ({ ...topic, skills: [...topic.skills, skill] }));
    },
    editSkill(topicId: string, skillId: string, name: string, rating: SkillRating) {
      changeTopic(topicId, (topic) => {
        if (!topic.skills.some((skill) => skill.id === skillId)) {
          throw new Error("Skill no longer exists.");
        }

        return {
          ...topic,
          skills: topic.skills.map((skill) => skill.id === skillId ? { ...skill, name, rating } : skill),
        };
      });
    },
    deleteSkill(topicId: string, skillId: string) {
      changeTopic(topicId, (topic) => ({
        ...topic,
        skills: topic.skills.filter((skill) => skill.id !== skillId),
      }));
    },
  };
}
