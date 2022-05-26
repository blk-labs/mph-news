import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useCallback, useState } from "react";

type NewsLetterSubscriptionProps = {
  className?: string;
}
export default function NewsLetterSubscription({ className }: NewsLetterSubscriptionProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const onEmailChanged = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );

  return (
    <div className={`w-full lg:w-1/3 ${className}`}>
      <div className="w-full mt-10 bg-black p-[26px] sticky top-0">
        <h3
          className={`mb-6 font-mont font-bold tracking-wide text-xl lg:text-3xl text-white`}
        >
          Our Newsletter
        </h3>
        <p className="mb-6 font-mont font-medium text-white tracking-wide">
          Subscribe to our newsletter to stay up-to-date with Nigerian politics
        </p>

        <form>
          <TextField
            color="secondary"
            value={email}
            onChange={onEmailChanged}
            placeholder="Email Address"
            className="bg-white"
            fullWidth
            InputProps={{ disableUnderline: true }}
          />

          <FormControlLabel
            control={<Checkbox defaultChecked color={"success"} className="border-white" />}
            label="I accept the terms and conditions"
            className="mt-12 text-white"
          />

          <input
            type={"submit"}
            value="Subscribe"
            className="mt-6 px-10 py-4 bg-white text-black font-mont font-bold hover:cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}
