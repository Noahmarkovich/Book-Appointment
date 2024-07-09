export function makeId(length = 6) {
  let txt = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function randomColor() {
  const x = Math.floor(Math.random() * 256);
  const y = 100 + Math.floor(Math.random() * 256);
  const z = 50 + Math.floor(Math.random() * 256);

  return "rgb(" + x + "," + y + "," + z + ")";
}

export function makeAnAvatar(fullName) {
  const splitInitials = fullName.split(" ");
  let initials;
  if (splitInitials.length > 1) {
    initials = splitInitials[0][0] + splitInitials[1][0];
  } else {
    initials = splitInitials[0][0];
  }
  const color = randomColor();

  return { initials, color };
}
