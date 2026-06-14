export default function GenreCard({ character, visible }) {
  if (!character?.description || !visible) return null;
  return (
    <div className="genre-card">
      <p className="genre-card-desc">{character.description}</p>
      <div className="genre-card-tags">{character.tags.join('  ')}</div>
    </div>
  );
}
