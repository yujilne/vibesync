import { THEMES } from '../themes/definitions';

export default function ThemeLabel({ themeId, visible }) {
  const theme = THEMES[themeId];
  if (!theme) return null;
  return (
    <div className="theme-label" style={{ opacity: visible ? 1 : 0 }}>
      {theme.name}
    </div>
  );
}
