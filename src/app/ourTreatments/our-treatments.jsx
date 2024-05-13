"use client";
import { Typography } from "@mui/material";

export function OurTreatmentsCmp({ data }) {
  if (!data) return <div>loading</div>;
  return (
    <div className="our-treatments">
      <Typography variant="h2">{data.content.treatments.title}</Typography>
      <Typography sx={{ maxWidth: "70%" }} variant="h6">
        {data.content.treatments.paragraph}
      </Typography>
      <img src={`/images/${data.content.treatments.image}.jpg`} />
      <div className="treatments">
        {data.content.treatments.treatments.map((treatment) => {
          return (
            <div key={treatment.id}>
              <Typography variant="h6">
                {treatment.type ?? treatment.title}
              </Typography>
              <Typography>{treatment.price} :מחיר</Typography>
              <Typography>{treatment.duration} :אורך טיפול</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}
