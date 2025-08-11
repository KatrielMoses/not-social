const XSvg = ({ horizontal = false, ...props }) => {
  if (horizontal) {
    return (
      <svg aria-hidden="true" role="img" viewBox="0 0 120 30" {...props}>
        <defs>
          <linearGradient id="textGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>


        <text
          x="10"
          y="20"
          fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
          fontWeight="800"
          fontSize="14"
          letterSpacing="0.5"
          fill="url(#textGradientH)"
        >
          NOT
        </text>


        <text
          x="50"
          y="20"
          fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
          fontWeight="400"
          fontSize="14"
          letterSpacing="0.3"
          fill="currentColor"
          opacity="0.8"
        >
          -Social
        </text>
      </svg>
    );
  }


  return (
    <svg aria-hidden="true" role="img" viewBox="0 0 120 60" {...props}>
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>


      <text
        x="60"
        y="25"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
        fontWeight="800"
        fontSize="18"
        letterSpacing="2"
        fill="url(#textGradient)"
      >
        NOT
      </text>


      <text
        x="60"
        y="45"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
        fontWeight="400"
        fontSize="14"
        letterSpacing="1"
        fill="currentColor"
        opacity="0.8"
      >
        -Social
      </text>
    </svg>
  );
};

export default XSvg;