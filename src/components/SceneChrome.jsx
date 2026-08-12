// Outer "world" chrome shared by every screen: sage background, banner
// ribbon, and a back control — echoing the live BAC lesson-map frame so
// each new screen still feels like part of the same product.
export default function SceneChrome({
  title,
  onBack,
  backLabel = "Back to map",
  eyebrow,
  children,
}) {
  return (
    <div className="ba-scene">
      <div className="ba-scene__terrain" aria-hidden="true" />
      <div className="ba-scene__topbar">
        {onBack ? (
          <button className="ba-round-btn" onClick={onBack} aria-label={backLabel}>
            <span aria-hidden="true">&#8592;</span>
          </button>
        ) : (
          <span />
        )}
        <div className="ba-banner">
          {eyebrow ? <span className="ba-banner__eyebrow">{eyebrow}</span> : null}
          <span className="ba-banner__text">{title}</span>
        </div>
        <span aria-hidden="true" />
      </div>
      <div className="ba-scene__stage-wrap">{children}</div>
    </div>
  );
}
