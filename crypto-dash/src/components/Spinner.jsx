import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      <BarLoader
        color="blue"
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
