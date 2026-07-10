import content from './content.json'

export const missionsShippedCount = content.missionGroups.reduce((total, group) => total + group.projects.length, 0)
