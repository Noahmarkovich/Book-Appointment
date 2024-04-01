import { Typography } from "@mui/material";

const treatments = {
  title: "Our treatments",
  paragraph:
    "At our hair removal clinic, we prioritize gentle and effective care for our clients. Our state-of-the-art facility utilizes advanced laser technology, such as diode lasers or intense pulsed light (IPL), to target unwanted hair with precision and minimal discomfort. We understand the sensitivity of skin in these treatments, which is why our trained professionals ensure each session is tailored to individual needs, considering skin type and hair texture. Additionally, we offer a range of soothing products designed to enhance post-treatment comfort and promote skin recovery, ensuring a smooth and satisfying experience for every client.",
  image: "treatment-areas",
  treatments: [
    {
      id: "t1",
      type: "בית שחי",
      duration: 30,
      price: 200,
    },
    {
      id: "t2",
      type: "רגליים",
      duration: 60,
      price: 400,
    },
    {
      id: "t3",
      type: "ידיים",
      duration: 45,
      price: 200,
    },
    {
      id: "t4",
      type: "שפם",
      duration: 30,
      price: 150,
    },
    {
      id: "t5",
      type: "מפשעות",
      duration: 30,
      price: 200,
    },
    {
      id: "t6",
      type: "בטן",
      duration: 30,
      price: 150,
    },
  ],
};

export default function OurTreatments() {
  return (
    <div className="our-treatments">
      <Typography variant="h2">{treatments.title}</Typography>
      <Typography sx={{ maxWidth: "70%" }} variant="h6">
        {treatments.paragraph}
      </Typography>
      <img src={`/images/${treatments.image}.jpg`} />
      <div className="treatments">
        {treatments.treatments.map((treatment) => {
          return (
            <div key={treatment.id}>
              <Typography variant="h6">{treatment.type}</Typography>
              <Typography>{treatment.price} :מחיר</Typography>
              <Typography>{treatment.duration} :אורך טיפול</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}
