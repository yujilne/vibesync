export default function ConnectButton({ authed, loading }) {
  if (loading) return <button className="connect-btn" disabled>...</button>;

  if (authed) {
    return (
      <a href="/auth/logout" className="connect-btn connected">
        ● Disconnect
      </a>
    );
  }

  return (
    <a href="/auth/login" className="connect-btn">
      ▶ Connect Spotify
    </a>
  );
}
