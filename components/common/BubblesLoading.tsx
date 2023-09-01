import PulseLoader from "react-spinners/PulseLoader";

interface CustomLoadingProps {
  color?: string;
  size?: string;
}

export const BubblesLoading = (props: CustomLoadingProps) => {
  return (
    <span>
      <PulseLoader
        color={props.color || "#5B6872"}
        size={props.size || ".1rem"}
        speedMultiplier={0.5}
      />
    </span>
  );
};
