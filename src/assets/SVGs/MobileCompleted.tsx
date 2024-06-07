type Props = {
  className?: string;
};

const MobileCompleted = ({ className }: Props) => {
  return (
    <svg
      width="25"
      className={className}
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.5965 7.39004L10.4365 14.3L8.5365 12.27C8.1865 11.94 7.6365 11.92 7.2365 12.2C6.8465 12.49 6.7365 13 6.9765 13.41L9.2265 17.07C9.4465 17.41 9.8265 17.62 10.2565 17.62C10.6665 17.62 11.0565 17.41 11.2765 17.07C11.6365 16.6 18.5065 8.41004 18.5065 8.41004C19.4065 7.49004 18.3165 6.68004 17.5965 7.38004V7.39004Z"
        fill="#7F56D9"
      />
    </svg>
  );
};

export default MobileCompleted;
