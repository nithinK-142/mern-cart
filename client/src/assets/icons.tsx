export const icons = {
  spinner: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full dark:text-black"
      style={{
        background: "transparent",
        shapeRendering: "auto",
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        strokeWidth="10"
        r="35"
        stroke="currentColor"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1.5625s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  ),
  logo: (
    <svg
      viewBox="0 -0.5 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full"
    >
      <path
        d="M10.315 30.944a2.947 2.947 0 1 0 0-5.894 2.947 2.947 0 0 0 0 5.894m16.208 0a2.947 2.947 0 1 0 0-5.894 2.947 2.947 0 0 0 0 5.894"
        fill="#FF4D00"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.526 5.894H7.447L6.61 2.281A2.87 2.87 0 0 0 5.572.64 2.87 2.87 0 0 0 3.738 0H1.474a1.474 1.474 0 0 0 0 2.947h2.264l.684 2.947H4.42l3.795 16.539q.115.502.518.823.402.32.918.32h17.155q.506 0 .905-.31.399-.312.523-.802l3.72-14.736q.083-.33.013-.664a1.46 1.46 0 0 0-.28-.602 1.45 1.45 0 0 0-.515-.418q-.306-.15-.647-.15"
        fill="url(#a)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.957 10.718c-.014-.057-.025-.115-.042-.173v-.175q0-.61.432-1.042a1.42 1.42 0 0 1 1.042-.431q.51 0 .91.315.401.315.521.81l2.137 8.795a1.5 1.5 0 0 1 .041.348q0 .611-.431 1.042a1.42 1.42 0 0 1-1.042.432q-.51 0-.911-.315-.4-.315-.521-.81zm8.683-.659q-.12-.495-.52-.81a1.43 1.43 0 0 0-.911-.316 1.42 1.42 0 0 0-1.042.432 1.42 1.42 0 0 0-.432 1.042 1.5 1.5 0 0 0 .042.348l2.136 8.795q.12.495.521.81.4.315.91.315a1.42 1.42 0 0 0 1.043-.431 1.42 1.42 0 0 0 .431-1.042 1.5 1.5 0 0 0-.041-.348z"
        fill="#fff"
        fillOpacity=".6"
        style={{ mixBlendMode: "hard-light" }}
      />
      <defs>
        <linearGradient
          id="a"
          x1="0"
          y1="0"
          x2="19.714"
          y2="29.661"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB300" />
          <stop offset="1" stopColor="#FF4900" />
        </linearGradient>
      </defs>
    </svg>
  ),
  cart: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1.56 1.56">
      <path d="M.603.78h.717c.021 0 .042-.015.045-.036l.132-.462a.046.046 0 0 0-.045-.06H.345L.327.153A.073.073 0 0 0 .258.099h-.12C.099.099.063.129.06.168a.074.074 0 0 0 .072.078h.069l.228.771a.07.07 0 0 0 .069.054h.846c.039 0 .075-.03.078-.069A.074.074 0 0 0 1.35.924H.606A.071.071 0 0 1 .537.873V.87C.522.825.558.78.603.78zm.135.558a.12.12 0 0 1-.12.12.12.12 0 0 1-.12-.12.12.12 0 0 1 .24 0zm.585 0a.12.12 0 0 1-.12.12.12.12 0 0 1-.12-.12.12.12 0 0 1 .24 0z" />
    </svg>
  ),
};
