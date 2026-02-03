export const liahnaPalette = {
  background: "#F6EFE7",
  surface: "#F0E0D1",
  card: "#EBE2DB",
  border: "#E7D6C6",
  text: "#3F352B",
  muted: "#6B654F",
  gold: "#CBA263",
  goldHover: "#B28E68",
  pearl: "#F5F3EF",
};

export const liahnaRadius = {
  base: 14,
  card: 16,
  pill: 999,
};

export const liahnaTypography = {
  display: `"Cinzel", serif`,
  sans: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
};

export const liahnaShadows = {
  card: "0 12px 28px -16px rgba(63, 53, 43, 0.25)",
  soft: "0 18px 38px -18px rgba(63, 53, 43, 0.26)",
};

export const liahnaTokens = {
  palette: liahnaPalette,
  radius: liahnaRadius,
  typography: liahnaTypography,
  shadows: liahnaShadows,
};

export type LiahnaTokens = typeof liahnaTokens;
