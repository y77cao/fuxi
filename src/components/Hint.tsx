import { useEffect, useState } from "react";

export const Hint = ({ hint }: { hint: string }) => {
  // somehow changing key will trigger fadeIn animation
  return (
    <div className={"fadeIn"} key={hint}>
      {hint}
    </div>
  );
};
