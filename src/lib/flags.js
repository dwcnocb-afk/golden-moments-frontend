export const TEAM_FLAGS = {
  ARG: "🇦🇷",
  ESP: "🇪🇸",
};

export function flagFor(code) {
  return TEAM_FLAGS[code] ?? "🏳️";
}
