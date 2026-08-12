// Difficulty tier shown as filled/empty stars instead of a raw point
// value — see utils/tier.js for the points -> tier mapping.
export default function StarRating({ tier, max = 3 }) {
  return (
    <span className="ba-star-rating" aria-label={`${tier} of ${max} star difficulty`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={
            "ba-star-rating__star" + (i < tier ? " ba-star-rating__star--filled" : "")
          }
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}
